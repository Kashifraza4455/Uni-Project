import { LearningHeader } from "@/components/learning/learning-header"
import { CourseCategories } from "@/components/learning/course-categories"
import { FeaturedCourses } from "@/components/learning/featured-courses"
import { LearningResources } from "@/components/learning/learning-resources"
import { ProgressTracker } from "@/components/learning/progress-tracker"

export default function LearningPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <LearningHeader />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <div className="lg:col-span-3 space-y-8">
          <FeaturedCourses />
          <LearningResources />
        </div>
        <div className="space-y-8">
          <ProgressTracker />
          <CourseCategories />
        </div>
      </div>
    </div>
  )
}
