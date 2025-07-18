import { getAllQuestions } from "./actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QuestionTableRow } from "@/components/question-table-row";

interface Question {
  id: string;
  questionText: string;
  category: string;
  questionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TEXT' | 'NUMERIC' | 'FILE_UPLOAD' | 'DATE' | 'BOOLEAN';
  weight: number;
  isMandatory: boolean;
  options: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

//keep this server sided component for now, check later maybe 
export default async function QuestionsPage() {
  const result = await getAllQuestions();

  if (!result.success) {
    return (
      <div className="p-4">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Questions</h1>
            <p className="text-gray-500 text-sm">
              Manage risk assessment questions and questionnaires
            </p>
          </div>
        </div>
        <div className="text-red-500">Error loading questions: {result.error}</div>
      </div>
    );
  }

  const questions: Question[] = result.questions || [];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">Questions</h1>
          <p className="text-gray-500 text-sm">
            Manage risk assessment questions and questionnaires
          </p>
        </div>
        <Link href="/admin/questions/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Question
          </Button>
        </Link>
      </div>

      {/* Questions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Questions ({questions.length} total)</CardTitle>
          <CardDescription>
            {questions.length === 0 
              ? "No questions found. Add your first question to get started."
              : `Showing ${questions.length} questions`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {questions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No questions found. Add your first question to get started.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <QuestionTableRow key={question.id} question={question} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}