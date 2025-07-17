import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { Pencil} from "lucide-react"
import Link from "next/link"

interface QuestionTableRowProps {
  question: {
    id: string;
    questionText: string;
    category: string;
    questionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TEXT' | 'NUMERIC' | 'FILE_UPLOAD' | 'DATE' | 'BOOLEAN';
    weight: number;
    isMandatory: boolean;
    options: string[];
    isActive: boolean;
  };
}

export function QuestionTableRow({ question }: QuestionTableRowProps) {
  const getQuestionTypeBadge = (type: string) => {
    switch (type) {
      case 'SINGLE_CHOICE':
        return { variant: 'default' as const, text: 'Single Choice' };
      case 'MULTIPLE_CHOICE':
        return { variant: 'secondary' as const, text: 'Multiple Choice' };
      case 'TEXT':
        return { variant: 'outline' as const, text: 'Text' };
      case 'NUMERIC':
        return { variant: 'outline' as const, text: 'Numeric' };
      case 'FILE_UPLOAD':
        return { variant: 'outline' as const, text: 'File Upload' };
      case 'DATE':
        return { variant: 'outline' as const, text: 'Date' };
      case 'BOOLEAN':
        return { variant: 'outline' as const, text: 'Yes/No' };
      default:
        return { variant: 'outline' as const, text: type };
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return {
      variant: isActive ? 'default' as const : 'secondary' as const,
      text: isActive ? 'Active' : 'Inactive'
    };
  };

  const getRequiredBadge = (isMandatory: boolean) => {
    return {
      variant: isMandatory ? 'default' as const : 'outline' as const,
      text: isMandatory ? 'Required' : 'Optional'
    };
  };

  const questionType = getQuestionTypeBadge(question.questionType);
  const status = getStatusBadge(question.isActive);
  const required = getRequiredBadge(question.isMandatory);

  return (
    <TableRow>
      {/* Question Text */}
      <TableCell>
        <div>
          <div className="font-medium">{question.questionText}</div>
          {question.options.length > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              {question.options.length} options
            </div>
          )}
        </div>
      </TableCell>

      {/* Category */}
      <TableCell>
        <Badge variant="outline">
          {question.category}
        </Badge>
      </TableCell>

      {/* Question Type */}
      <TableCell>
        <Badge variant={questionType.variant}>
          {questionType.text}
        </Badge>
      </TableCell>

      {/* Weight */}
      <TableCell>
        <Badge variant="destructive">
          {question.weight}
        </Badge>
      </TableCell>

      {/* Required/Optional */}
      <TableCell>
        <Badge variant={required.variant}>
          {required.text}
        </Badge>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge variant={status.variant}>
          {status.text}
        </Badge>
      </TableCell>

      {/* Details */}
      <TableCell>
        <Link href={`/questions/${question.id}`}>
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4 mr-1" />
            Edit Question
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
} 