import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Star, Play } from "lucide-react"
import Image from "next/image"

const featuredCourses = [
  {
    id: 1,
    title: "Commodity Investing Fundamentals",
    description: "Learn the basics of commodity markets, from gold and oil to agricultural products.",
    level: "Beginner",
    duration: "4 hours",
    students: 1250,
    rating: 4.8,
    progress: 0,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Dr. Sarah Johnson",
    price: "Free",
  },
  {
    id: 2,
    title: "Advanced Portfolio Diversification",
    description: "Master the art of building diversified commodity portfolios for optimal risk management.",
    level: "Advanced",
    duration: "6 hours",
    students: 890,
    rating: 4.9,
    progress: 35,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Michael Chen",
    price: "$99",
  },
  {
    id: 3,
    title: "Technical Analysis for Commodities",
    description: "Learn to read charts and identify trading opportunities in commodity markets.",
    level: "Intermediate",
    duration: "5 hours",
    students: 2100,
    rating: 4.7,
    progress: 0,
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Alex Rodriguez",
    price: "$79",
  },
]

export function FeaturedCourses() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Featured Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge
                  variant={
                    course.level === "Beginner"
                      ? "secondary"
                      : course.level === "Intermediate"
                        ? "default"
                        : "destructive"
                  }
                >
                  {course.level}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="bg-white/90">
                  {course.price}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {course.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  {course.progress > 0 ? "Continue Learning" : "Start Course"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
