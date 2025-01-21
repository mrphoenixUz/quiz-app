// app/category/[id]/page.jsx
import { Suspense } from 'react'
import { Workspaces } from "@mui/icons-material";
import QuizContent from './quiz-content'

export default function CategoryPage() {
  return (
    <Suspense 
      fallback={
        <div className="p-4 md:p-10 text-center">
          <span className="animate-spin inline-block">
            <Workspaces fontSize="large" />
          </span>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  )
}