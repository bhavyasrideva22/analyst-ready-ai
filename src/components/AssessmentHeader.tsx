import { Progress } from "@/components/ui/progress";

interface AssessmentHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
}

export const AssessmentHeader = ({ currentStep, totalSteps, title, subtitle }: AssessmentHeaderProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-gradient-card border-b border-assessment-border px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
              <span className="text-primary-foreground font-semibold">{currentStep}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</p>
          </div>
        </div>
        
        <Progress value={progressPercentage} className="h-2 bg-progress-bg">
          <div 
            className="h-full bg-gradient-primary rounded-full transition-smooth" 
            style={{ width: `${progressPercentage}%` }}
          />
        </Progress>
        
        {subtitle && (
          <p className="text-muted-foreground mt-4 text-center">{subtitle}</p>
        )}
      </div>
    </div>
  );
};