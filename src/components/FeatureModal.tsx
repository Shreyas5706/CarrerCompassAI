import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from 'lucide-react';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    details?: string;
    benefits?: string[];
    ctaText?: string;
  };
}

export function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  const { icon: Icon, title, description, details, benefits, ctaText } = feature;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border animate-scale-in">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-white icon-float" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-card-foreground">
                  {title}
                </DialogTitle>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <DialogDescription className="text-muted-foreground text-base leading-relaxed">
            {description}
          </DialogDescription>
          
          {details && (
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-secondary-foreground text-sm leading-relaxed">
                {details}
              </p>
            </div>
          )}
          
          {benefits && benefits.length > 0 && (
            <div>
              <h4 className="font-semibold text-card-foreground mb-2">Key Benefits:</h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2 text-muted-foreground text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="gradient" className="group">
              {ctaText || "Learn More"}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}