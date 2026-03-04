"use client"

import { useEffect, useState } from "react"

import ScoreCard from "@/components/dashboard/ScoreCard"
import CriticalSubjects from "@/components/dashboard/CriticalSubjects"
import QuickGains from "@/components/dashboard/QuickGains"

import PerformanceChart from "@/components/charts/PerformanceChart"
import ScoreEvolution from "@/components/charts/ScoreEvolution"

import { runStudyEngine } from "@/lib/engine/studyEngine"

export default function DashboardPage() {

    const [analysis, setAnalysis] = useState<any>(null)

    useEffect(() => {

        async function loadAnalysis() {

            const result = await runStudyEngine("4fec57ff-0840-48c9-a68b-b49ad84e877f")

            setAnalysis(result)

        }

        loadAnalysis()

    }, [])

    if (!analysis) {
        return <p>Carregando dashboard...</p>
    }

    const criticalSubjects = analysis.criticalSubjects.map((s: any) => ({
        subject: s.subject,
        accuracy: s.accuracy
    }))

    const quickGains = analysis.improvementSimulations.map((g: any) => ({
        subject: g.subject,
        gain: g.gain,
        currentAccuracy: g.accuracy
    }))

    const performanceData = analysis.priorityMap.map((p: any) => ({
        subject: p.subject,
        accuracy: p.accuracy
    }))

    const evolutionData = [
        { week: "Sem 1", score: analysis.studyScore - 15 },
        { week: "Sem 2", score: analysis.studyScore - 10 },
        { week: "Sem 3", score: analysis.studyScore - 6 },
        { week: "Sem 4", score: analysis.studyScore - 3 },
        { week: "Sem 5", score: analysis.studyScore - 1 },
        { week: "Sem 6", score: analysis.studyScore }
    ]

    return (

        <div className="space-y-8">

            <h1 className="text-2xl font-bold">
                Dashboard
            </h1>

            {/* SCORE CARDS */}

            <div className="grid grid-cols-3 gap-6">

                <ScoreCard
                    title="Score de Estudo"
                    value={`${analysis.studyScore}%`}
                    subtitle="Baseado no desempenho geral"
                />

                <ScoreCard
                    title="Probabilidade de Aprovação"
                    value={`${analysis.approvalProbability ?? 0}%`}
                    subtitle="Estimativa baseada no progresso"
                />

                <ScoreCard
                    title="Nota Projetada"
                    value={`${analysis.projectedScore} / 80`}
                    subtitle={`Faltam ${analysis.missingPoints} pontos`}
                />

            </div>

            {/* DIAGNÓSTICO */}

            <div className="grid grid-cols-2 gap-6">

                <CriticalSubjects subjects={criticalSubjects} />

                <QuickGains gains={quickGains} />

            </div>

            {/* GRÁFICOS */}

            <div className="grid grid-cols-2 gap-6">

                <PerformanceChart data={performanceData} />

                <ScoreEvolution data={evolutionData} />

            </div>

        </div>
    )
}