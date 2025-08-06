import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { TestIntroduction } from "@/components/TestIntroduction";
import { PsychometricSection } from "@/components/PsychometricSection";
import { TechnicalSection } from "@/components/TechnicalSection";
import { WiscarSection } from "@/components/WiscarSection";
import { ResultsSection } from "@/components/ResultsSection";

type AssessmentStage = 'hero' | 'introduction' | 'psychometric' | 'technical' | 'wiscar' | 'results';

interface AssessmentData {
  psychometric?: Record<string, number>;
  technical?: Record<string, number>;
  wiscar?: Record<string, number>;
}

const Index = () => {
  const [currentStage, setCurrentStage] = useState<AssessmentStage>('hero');
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({});

  const handleStartAssessment = () => {
    setCurrentStage('introduction');
  };

  const handleIntroductionNext = () => {
    setCurrentStage('psychometric');
  };

  const handlePsychometricComplete = (scores: Record<string, number>) => {
    setAssessmentData(prev => ({ ...prev, psychometric: scores }));
    setCurrentStage('technical');
  };

  const handleTechnicalComplete = (scores: Record<string, number>) => {
    setAssessmentData(prev => ({ ...prev, technical: scores }));
    setCurrentStage('wiscar');
  };

  const handleWiscarComplete = (scores: Record<string, number>) => {
    setAssessmentData(prev => ({ ...prev, wiscar: scores }));
    setCurrentStage('results');
  };

  const handleRestart = () => {
    setCurrentStage('hero');
    setAssessmentData({});
  };

  const getFinalScores = () => {
    const { psychometric = {}, technical = {}, wiscar = {} } = assessmentData;
    
    return {
      psychometricFit: psychometric.psychometricFit || 0,
      technicalReadiness: technical.technicalReadiness || 0,
      overallConfidence: wiscar.overallConfidence || 0,
      wScore: wiscar.wScore || 0,
      iScore: wiscar.iScore || 0,
      sScore: wiscar.sScore || 0,
      cScore: wiscar.cScore || 0,
      aScore: wiscar.aScore || 0,
      rScore: wiscar.rScore || 0,
    };
  };

  switch (currentStage) {
    case 'hero':
      return <HeroSection onStartAssessment={handleStartAssessment} />;
    case 'introduction':
      return <TestIntroduction onNext={handleIntroductionNext} />;
    case 'psychometric':
      return <PsychometricSection onNext={handlePsychometricComplete} />;
    case 'technical':
      return <TechnicalSection onNext={handleTechnicalComplete} />;
    case 'wiscar':
      return <WiscarSection onNext={handleWiscarComplete} />;
    case 'results':
      return <ResultsSection scores={getFinalScores()} onRestart={handleRestart} />;
    default:
      return <HeroSection onStartAssessment={handleStartAssessment} />;
  }
};

export default Index;
