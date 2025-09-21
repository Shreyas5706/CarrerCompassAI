import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { chatbotService } from '@/lib/googleCloudAI';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// ✅ Formatter function
const formatMessageText = (text: string): string => {
  let formatted = text;

  // Escape HTML (basic protection against injection)
  formatted = formatted
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold *text*
  formatted = formatted.replace(/\\(.?)\\*/g, "<strong>$1</strong>");

  // Italic text
  formatted = formatted.replace(/\((.?)\*/g, "<em>$1</em>");

  // Numbered lists
  formatted = formatted.replace(
    /(?:^|\n)(\d+)\.\s?(.*?)(?=\n|$)/g,
    "<li>$1. $2</li>"
  );

  // Bullet lists (• or -)
  formatted = formatted.replace(
    /(?:^|\n)[•\-]\s?(.*?)(?=\n|$)/g,
    "<li>$1</li>"
  );

  // Wrap <li> in <ul> or <ol>
  if (formatted.includes("<li>")) {
    if (/\d+\.\s/.test(text)) {
      formatted = `<ol className="list-decimal pl-5 space-y-1">${formatted}</ol>`;
    } else {
      formatted = `<ul className="list-disc pl-5 space-y-1">${formatted}</ul>`;
    }
  }

  // Line breaks
  formatted = formatted.replace(/\n/g, "<br/>");

  return formatted;
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI career assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Categorize queries (same as your version)
  const categorizeQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    const categories = {
      careerPath: ['career path', 'career options', 'job options', 'profession', 'industry', 'field'],
      skillAssessment: ['skill', 'assessment', 'strengths', 'abilities', 'competencies', 'talents'],
      resumeHelp: ['resume', 'cv', 'cover letter', 'application', 'portfolio'],
      interviewPrep: ['interview', 'prepare', 'question', 'hiring', 'recruiter'],
      salaryInfo: ['salary', 'compensation', 'pay', 'negotiation', 'offer', 'benefits', 'package'],
      education: ['education', 'degree', 'certification', 'course', 'training', 'learn', 'study'],
      networking: ['network', 'connection', 'linkedin', 'contact', 'referral', 'recommendation'],
      workLifeBalance: ['balance', 'burnout', 'stress', 'remote', 'flexible', 'hours', 'schedule'],
      careerChange: ['change', 'transition', 'switch', 'pivot', 'new direction', 'different field'],
      jobSearch: ['search', 'find', 'hunting', 'applying', 'application', 'opportunity']
    };

    let bestCategory = 'general';
    let highestMatches = 0;

    for (const [category, keywords] of Object.entries(categories)) {
      const matches = keywords.filter(keyword => lowerQuery.includes(keyword)).length;
      if (matches > highestMatches) {
        highestMatches = matches;
        bestCategory = category;
      }
    }
    return bestCategory;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let aiResponse = null;
      try {
        aiResponse = await chatbotService.sendMessage(input);
      } catch (error) {
        console.log('Error calling Google Cloud AI:', error);
      }

      if (aiResponse && aiResponse.response) {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: aiResponse.response,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setIsLoading(false);
        return;
      }

      // Fallback
      const queryCategory = categorizeQuery(input);
      const predefinedResponses = {
        careerPath: `Based on current market trends, I recommend exploring these high-growth fields:
        
1. Data Science & AI - Average salary: $120,000/year
2. Healthcare Technology - Average salary: $95,000/year
3. Sustainable Energy - Average salary: $105,000/year
4. Cybersecurity - Average salary: $110,000/year
5. Digital Marketing - Average salary: $85,000/year

Would you like me to analyze which of these aligns best with your skills?`,

        skillAssessment: `I can help assess your skills through these methods:

1. Quick Self-Assessment: Answer 10 questions about your preferences and experiences
2. Resume Analysis: Upload your resume for AI-powered skill extraction
3. Comprehensive Assessment: Complete a 30-minute evaluation covering technical and soft skills

Which approach would you prefer to start with?`,

        resumeHelp: `I can analyze your resume to provide personalized career insights:

• Identify your key skills and experience level
• Suggest skills you should highlight based on target roles
• Recommend improvements to match industry standards
• Compare your profile to successful professionals in your field

Would you like to upload your resume now for analysis?`,

        interviewPrep: `Here are my top interview preparation tips:

1. Research the company thoroughly (culture, recent news, products)
2. Prepare specific examples using the STAR method (Situation, Task, Action, Result)
3. Practice these common questions:
   - "Tell me about a challenge you overcame"
   - "Why do you want to work here?"
   - "Where do you see yourself in 5 years?"
4. Prepare 3-5 thoughtful questions to ask the interviewer

Would you like me to provide tailored interview questions for a specific role?`,

        salaryInfo: `When negotiating salary, consider these data-driven strategies:

• The average professional can increase their offer by 10-15% through negotiation
• Research shows Tuesday is the optimal day to negotiate (decision fatigue is lower)
• Focus on your unique value proposition rather than personal needs
• Consider the total compensation package (benefits, flexibility, growth)

What specific role are you negotiating for? I can provide industry-specific salary benchmarks.`,

        education: `Based on current employer preferences, here are the most valuable credentials:

1. Technical Certifications: AWS, Google Cloud, Azure (94% employer recognition)
2. Data Analysis: SQL, Python, R, Tableau (87% employer demand)
3. Project Management: PMP, Agile, Scrum (82% employer value)
4. Soft Skills: Leadership, communication workshops (76% employer interest)

What specific field are you looking to upskill in?`,

        networking: `Strategic networking significantly impacts career growth. Consider these approaches:

• Quality over quantity: Research shows meaningful connections with 5-7 industry professionals is more valuable than 100+ surface-level connections
• Engage in industry-specific online communities (Slack groups, Discord servers, Reddit)
• Set a goal to have one informational interview per month
• Create and share valuable content in your area of expertise

Would you like specific networking strategies for your industry?`,

        workLifeBalance: `Based on research from top companies with high employee satisfaction:

• Regular breaks increase productivity by 28% (take 5-10 minute breaks every hour)
• Setting clear boundaries between work and personal time reduces burnout by 43%
• Flexible work arrangements improve job satisfaction by 65%
• Prioritizing tasks using the Eisenhower Matrix can reduce stress by 31%

Would you like personalized strategies for improving your work-life balance?`,

        careerChange: `Career transitions are increasingly common, with the average professional making 5-7 career changes in their lifetime. For a successful transition:

1. Identify transferable skills from your current role
2. Research skill gaps for your target field
3. Create a strategic upskilling plan (courses, certifications, projects)
4. Develop a compelling career change narrative
5. Build a network in your target industry before making the switch

What field are you considering transitioning to?`,

        jobSearch: `To optimize your job search in today's market:

• 70% of positions are filled through networking rather than job boards
• Tailoring your resume for each application increases interview chances by 61%
• Following up within 48 hours after applying boosts response rates by 42%
• Tuesday mornings (9-11am) are statistically the best time to submit applications

Would you like a personalized job search strategy based on your target role?`,

        general: `I'm your AI-powered career assistant with access to:

• Labor market data across 500+ industries
• Skill requirements for 10,000+ job roles
• Salary benchmarks updated quarterly
• Career progression patterns from millions of professionals

To provide the most relevant guidance, could you share more about your current career situation or specific questions?`
      };

      let botResponse = predefinedResponses[queryCategory as keyof typeof predefinedResponses] || predefinedResponses.general;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, something went wrong. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
<>
    <Card className="flex flex-col h-[500px] w-full max-w-md mx-auto">

      <div className="p-4 bg-primary text-primary-foreground font-semibold">
        Career Compass AI Assistant
      </div>

      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }}
                />
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          disabled={isLoading}
          className="flex-grow"
        />
        <Button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </Card>
</>
);
};

export default Chatbot;