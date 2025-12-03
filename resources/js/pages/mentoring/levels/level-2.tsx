"use client"

import LevelLayout from "./LevelLayout"
import { supabase } from "@/lib/supabaseClient"
import { usePage } from "@inertiajs/react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Trophy, Zap, Heart, Target, Brain } from "lucide-react"

type GameState = "playing" | "completed"
type ObjectType = "positive" | "negative"

interface GameObject {
  id: string
  type: ObjectType
  position: "left" | "right"
}

interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
}

const POSITIVE_EMOJIS = ["😊", "🌟", "💖", "🌸", "✨", "🦋", "🌈", "☀️"]
const NEGATIVE_EMOJIS = ["😞", "🌧️", "💔", "🥀", "⚡", "🕷️", "⛈️", "🌑"]

const MOTIVATIONAL_MESSAGES = [
  "Amazing focus! 🎯",
  "You're doing great! ✨",
  "Keep going! 💪",
  "Brilliant! 🌟",
  "Perfect timing! ⚡",
  "Excellent work! 🎉",
  "Stay positive! 💖",
  "You've got this! 🚀"
]

export default function Level2() {
  const { auth } = usePage<any>().props
  const [gameState, setGameState] = useState<GameState>("playing")
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [round, setRound] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [currentObject, setCurrentObject] = useState<GameObject | null>(null)
  const [reactionTime, setReactionTime] = useState<number[]>([])
  const [roundStartTime, setRoundStartTime] = useState<number>(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"correct" | "wrong">("correct")
  const [message, setMessage] = useState("")
  const [totalRounds] = useState(20)
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "first-click", title: "First Step", description: "Complete your first round", unlocked: false },
    { id: "speed-demon", title: "Speed Demon", description: "React in under 300ms", unlocked: false },
    { id: "streak-5", title: "On Fire", description: "Get a 5-streak", unlocked: false },
    { id: "streak-10", title: "Unstoppable", description: "Get a 10-streak", unlocked: false },
    { id: "perfectionist", title: "Perfectionist", description: "Complete a game with 100% accuracy", unlocked: false },
    { id: "level-master", title: "Level Master", description: "Reach level 5", unlocked: false },
  ])
  const [swapInterval, setSwapInterval] = useState<number>(3000)
  const [lastSwapTime, setLastSwapTime] = useState<number>(Date.now())

  const avgReactionTime = reactionTime.length > 0 
    ? Math.round(reactionTime.reduce((a, b) => a + b, 0) / reactionTime.length)
    : 0

  useEffect(() => {
    if (avgReactionTime > 0) {
      const newInterval = Math.min(8000, Math.max(2000, avgReactionTime * 2.5))
      setSwapInterval(newInterval)
    }
  }, [avgReactionTime])

  useEffect(() => {
    if (gameState !== "playing" || !currentObject) return
    const checkSwap = setInterval(() => {
      const timeSinceLastSwap = Date.now() - lastSwapTime
      if (timeSinceLastSwap >= swapInterval) {
        setCurrentObject(prev => {
          if (!prev) return prev
          return {
            ...prev,
            position: prev.position === "left" ? "right" : "left"
          }
        })
        setLastSwapTime(Date.now())
        setRoundStartTime(Date.now())
      }
    }, 100)
    return () => clearInterval(checkSwap)
  }, [gameState, currentObject, swapInterval, lastSwapTime])

  const generateNewObject = useCallback(() => {
    const position = Math.random() > 0.5 ? "left" : "right"
    const newObject: GameObject = {
      id: Math.random().toString(36),
      type: "positive",
      position
    }
    setCurrentObject(newObject)
    setRoundStartTime(Date.now())
    setLastSwapTime(Date.now())
  }, [])

  useEffect(() => {
    if (gameState === "playing" && round === 0 && !currentObject) {
      generateNewObject()
    }
  }, [gameState, round, currentObject, generateNewObject])

  const checkAchievements = useCallback((newScore: number, newStreak: number, avgReactionTime: number) => {
    setAchievements(prev => prev.map(ach => {
      if (ach.unlocked) return ach
      if (ach.id === "first-click" && round >= 1) {
        return { ...ach, unlocked: true }
      }
      if (ach.id === "speed-demon" && avgReactionTime < 300) {
        return { ...ach, unlocked: true }
      }
      if (ach.id === "streak-5" && newStreak >= 5) {
        return { ...ach, unlocked: true }
      }
      if (ach.id === "streak-10" && newStreak >= 10) {
        return { ...ach, unlocked: true }
      }
      if (ach.id === "level-master" && level >= 5) {
        return { ...ach, unlocked: true }
      }
      return ach
    }))
  }, [round, level])

  const handleClick = (clickedPosition: "left" | "right") => {
    if (!currentObject || gameState !== "playing") return
    const timeTaken = Date.now() - roundStartTime
    const isCorrect = clickedPosition === currentObject.position
    if (isCorrect) {
      const newScore = score + 10 + streak * 5
      const newStreak = streak + 1
      const newReactionTimes = [...reactionTime, timeTaken]
      setScore(newScore)
      setStreak(newStreak)
      setReactionTime(newReactionTimes)
      setBestStreak(Math.max(bestStreak, newStreak))
      setFeedbackType("correct")
      setMessage(MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)])
      if ((round + 1) % 5 === 0 && level < 10) {
        setLevel(prev => prev + 1)
      }
      checkAchievements(newScore, newStreak, newReactionTimes.reduce((a, b) => a + b, 0) / newReactionTimes.length)
    } else {
      setStreak(0)
      setFeedbackType("wrong")
      setMessage("Focus on the positive! 💫")
    }
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 600)
    if (round + 1 >= totalRounds) {
      setTimeout(() => {
        setGameState("completed")
        if (score === totalRounds * 10) {
          setAchievements(prev => prev.map(ach => 
            ach.id === "perfectionist" ? { ...ach, unlocked: true } : ach
          ))
        }
      }, 600)
    } else {
      setRound(prev => prev + 1)
      setTimeout(generateNewObject, 600)
    }
  }

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setLevel(1)
    setRound(0)
    setStreak(0)
    setReactionTime([])
    generateNewObject()
  }

  const accuracy = round > 0 ? Math.round((reactionTime.length / round) * 100) : 0
  const newUnlockedAchievements = achievements.filter(a => a.unlocked)

  const [reportedComplete, setReportedComplete] = useState(false)

  useEffect(() => {
    if (gameState !== "completed" || reportedComplete) return
    const userId = auth?.user?.id
    if (!userId) return
    const isConfigured = Boolean((import.meta as any).env.VITE_SUPABASE_URL || (import.meta as any).env.SUPABASE_URL)
    if (!isConfigured) return
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1
    const now = new Date().toISOString()
    ;(async () => {
      try {
        await supabase
          .from("level_completions")
          .upsert({ user_id: userId, level_id: 2, stars, completed_at: now, updated_at: now }, { onConflict: "user_id,level_id" })
        setReportedComplete(true)
      } catch {}
    })()
  }, [gameState, reportedComplete, auth?.user?.id, accuracy])

  return (
    <LevelLayout title="Level 2 · Mindfulness">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Mindfulness Focus Game
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Train your brain to focus on positivity. Click the positive emoji as fast as you can!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6"
        >
          <Card className="p-4 text-center bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs opacity-90">Score</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
            <div className="text-2xl font-bold">{level}</div>
            <div className="text-xs opacity-90">Level</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-xs opacity-90">Streak 🔥</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <div className="text-2xl font-bold">{accuracy}%</div>
            <div className="text-xs opacity-90">Accuracy</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <div className="text-2xl font-bold">{avgReactionTime}ms</div>
            <div className="text-xs opacity-90">Avg Time</div>
          </Card>
        </motion.div>

        {gameState === "playing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{round}/{totalRounds}</span>
            </div>
            <Progress value={(round / totalRounds) * 100} className="h-3" />
          </motion.div>
        )}

        <Card className="p-8 md:p-12 mb-6 bg-white/50 dark:bg-black/30 backdrop-blur-sm border-2">
          <AnimatePresence mode="wait">
            {gameState === "playing" && currentObject && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-8 md:gap-16 max-w-3xl mx-auto">
                  <motion.button
                    key={`left-${currentObject.id}-${currentObject.position}`}
                    onClick={() => handleClick("left")}
                    className="aspect-square rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-9xl hover:scale-105 transition-transform border-4 border-transparent hover:border-purple-400"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      scale: [1, 1.02, 1],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {currentObject.position === "left" 
                      ? POSITIVE_EMOJIS[round % POSITIVE_EMOJIS.length]
                      : NEGATIVE_EMOJIS[round % NEGATIVE_EMOJIS.length]
                    }
                  </motion.button>

                  <motion.button
                    key={`right-${currentObject.id}-${currentObject.position}`}
                    onClick={() => handleClick("right")}
                    className="aspect-square rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center text-9xl hover:scale-105 transition-transform border-4 border-transparent hover:border-blue-400"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      scale: [1, 1.02, 1],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {currentObject.position === "right" 
                      ? POSITIVE_EMOJIS[round % POSITIVE_EMOJIS.length]
                      : NEGATIVE_EMOJIS[round % NEGATIVE_EMOJIS.length]
                    }
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <div className={`text-6xl font-bold ${feedbackType === "correct" ? "text-green-500" : "text-red-500"}`}>
                        {feedbackType === "correct" ? "✓" : "✗"}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center mt-6"
                    >
                      <p className="text-xl font-medium text-purple-600 dark:text-purple-400">
                        {message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center mt-6 text-sm text-muted-foreground">
                  <p>⚡ Positions swap every {(swapInterval / 1000).toFixed(1)}s based on your speed</p>
                </div>
              </motion.div>
            )}

            {gameState === "completed" && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="text-8xl mb-6"
                >
                  🎉
                </motion.div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Excellent Work!
                </h2>
                <p className="text-muted-foreground mb-8">
                  You've completed your mindfulness session
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
                  <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200">
                    <Trophy className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{score}</div>
                    <div className="text-xs text-muted-foreground">Final Score</div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200">
                    <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{bestStreak}</div>
                    <div className="text-xs text-muted-foreground">Best Streak</div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
                    <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200">
                    <Brain className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{avgReactionTime}ms</div>
                    <div className="text-xs text-muted-foreground">Avg Reaction</div>
                  </Card>
                </div>

                {newUnlockedAchievements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      Achievements Unlocked
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {newUnlockedAchievements.map((ach, index) => (
                        <motion.div
                          key={ach.id}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <Badge className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                            🏆 {ach.title}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <Button
                  size="lg"
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
                >
                  Play Again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {gameState === "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Your Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {achievements.map(ach => (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      ach.unlocked 
                        ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700" 
                        : "bg-muted/50 border-muted-foreground/20 opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{ach.unlocked ? "🏆" : "🔒"}</div>
                      <div>
                        <div className="font-semibold">{ach.title}</div>
                        <div className="text-xs text-muted-foreground">{ach.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          <p className="mb-2">
            <Heart className="w-4 h-4 inline mr-1" />
            This game uses attention-bias modification therapy principles
          </p>
          <p>
            Regular practice can help reduce anxiety and train your brain to focus on positive stimuli
          </p>
        </motion.div>
      </div>
    </LevelLayout>
  )
}
