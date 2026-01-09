'use client';

import { useEffect } from 'react';
import { usePersonaStore } from '@/store/usePersonaStore';
// ダミーデータの自動読み込みは無効化
// import { dummyStatements, dummyPersonaSummaries, dummyComparison } from '@/data/dummyData';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import InputScreen from '@/components/screens/InputScreen';
import ExtractionGenerationScreen from '@/components/screens/ExtractionGenerationScreen';
import ExtractionReviewScreen from '@/components/screens/ExtractionReviewScreen';
import AggregationScreen from '@/components/screens/AggregationScreen';
import PersonaAxisScreen from '@/components/screens/PersonaAxisScreen';
import PersonaScreen from '@/components/screens/PersonaScreen';
import OrganizeScreen from '@/components/screens/OrganizeScreen';
import SummaryScreen from '@/components/screens/SummaryScreen';
import ComparisonScreen from '@/components/screens/ComparisonScreen';
import KnowledgeBaseScreen from '@/components/screens/KnowledgeBaseScreen';

export default function Home() {
  const { currentStep, setCurrentStep } = usePersonaStore();

  // ダミーデータの自動読み込みは無効化
  // ユーザーが明示的にデータを入力するまで、事前データは読み込まれません
  // useEffect(() => {
  //   // ダミーデータの自動読み込みは無効化
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-24">
        <Sidebar />
        <main className="flex-1 ml-64 px-4 py-8">
          {currentStep === 'input' && <InputScreen />}
          {currentStep === 'extraction' && <ExtractionGenerationScreen />}
          {currentStep === 'extraction-review' && <ExtractionReviewScreen />}
          {currentStep === 'aggregation' && <AggregationScreen />}
          {currentStep === 'persona-axis' && <PersonaAxisScreen />}
          {currentStep === 'summary' && <PersonaScreen />}
          {currentStep === 'organize' && <OrganizeScreen />}
          {currentStep === 'comparison' && <ComparisonScreen />}
          {currentStep === 'knowledge-base' && <KnowledgeBaseScreen />}
          {!currentStep && <InputScreen />}
        </main>
      </div>
    </div>
  );
}
