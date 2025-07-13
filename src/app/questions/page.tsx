import { getAllQuestions } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Questions</h1>
        <div className="text-red-500">Error loading questions: {result.error}</div>
      </div>
    );
  }

  const questions: Question[] = result.questions || [];

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Questions</h1>
      
      {questions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No questions found. Add your first question to get started.
        </div>
      ) : (
        <div className="grid gap-4">
          {questions.map((question) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{question.questionText}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{question.category}</Badge>
                      <Badge variant="outline">{question.questionType}</Badge>
                      <Badge variant="outline">
                        {question.isMandatory ? "Mandatory" : "Optional"}
                      </Badge>
                      <Badge variant="destructive">Weight: {question.weight}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              {question.options.length > 0 && (
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">Options:</h4>
                    <div className="flex flex-wrap gap-2">
                      {question.options.map((option, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}