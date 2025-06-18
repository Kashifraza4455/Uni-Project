import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target } from "lucide-react"

const progressData = {
  coursesCompleted: 3,
  totalCourses: 12,
  currentStreak: 7,
  totalHours: 24,
  achievements: [
    { name: "First Course", completed: true },
    { name: "Week Streak", completed: true },
    { name: "Advanced Learner", completed: false },
    { name: "Expert Level", completed: false },
  ],
}

export function ProgressTracker() {
  const completionRate = (progressData.coursesCompleted / progressData.totalCourses) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Your Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Course Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Courses Completed</span>
            <span>
              {progressData.coursesCompleted}/{progressData.totalCourses}
            </span>
          </div>
          <Progress value={completionRate} className="h-2" />
          <p className="text-xs text-muted-foreground">{completionRate.toFixed(0)}% Complete</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{progressData.currentStreak}</div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{progressData.totalHours}</div>
            <p className="text-xs text-muted-foreground">Hours Learned</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Achievements</span>
          </h4>
          <div className="space-y-2">
            {progressData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${achievement.completed ? "bg-green-500" : "bg-gray-300"}`} />
                <span className={`text-sm ${achievement.completed ? "text-foreground" : "text-muted-foreground"}`}>
                  {achievement.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
