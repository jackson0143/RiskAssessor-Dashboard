'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircleIcon, Plus, X, Loader2 } from 'lucide-react';
import { addQuestion } from '../actions';
import { useRouter } from 'next/navigation'; 
export default function AddQuestionForm() {
  const router = useRouter();
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [weight, setWeight] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [options, setOptions] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      //filter out blank options
      const filteredOptions = options.filter(option => option.trim() !== '');
      
      // Create FormData object
      const formData = new FormData();
      formData.append('questionText', questionText);
      formData.append('category', category);
      formData.append('questionType', questionType);
      formData.append('weight', weight);
      formData.append('isMandatory', isMandatory.toString());
      formData.append('isActive', isActive.toString());
      formData.append('options', JSON.stringify(filteredOptions));
      
      
      const result = await addQuestion(formData);
      
            if (result.success) {
        // Reset form
        setQuestionText('');
        setCategory('');
        setQuestionType('');
        setWeight('');
        setIsMandatory(false);
        setIsActive(true);
        setOptions(['']);
        
        // Redirect to questions page
        router.push('/questions');
      } else {
        setError(result.message || 'Failed to add question. Please try again.');
      }
    } catch {
      setError('An error occurred while creating the question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <Card className="mb-6 w-1/2">
      <CardHeader>
        <CardTitle>Add New Question</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="questionType" className="text-sm font-medium">
              Question Type
            </Label>
            <Select value={questionType} onValueChange={setQuestionType} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                <SelectItem value="single_choice">Single Choice</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Yes/No</SelectItem>
                <SelectItem value="file_upload">File Upload</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="questionText" className="text-sm font-medium">
              Question Text
            </Label>
            <Input
              type="text"
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter question text"
              required
            />
          </div>
          
          

          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium">
              Weight
            </Label>
            <Input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter question weight (0-1)"
              min="0"
              max="1"
              step="0.01"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <Input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter question category"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isMandatory"
                checked={isMandatory}
                onChange={(e) => setIsMandatory(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isMandatory" className="text-sm font-medium">
                Mandatory Question
              </Label>
            </div>
          </div>



          {(questionType === 'multiple_choice' ) && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Options
              </Label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                                         {options.length > 1 && (
                       <Button
                         type="button"
                        //  variant="outline"
                         size="icon"
                         onClick={() => removeOption(index)}
                         className="px-2 hover:bg-red-500 hover:text-white "
                       >
                         <X className="h-4 w-4 " />
                       </Button>
                     )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Question...
              </>
            ) : (
              'Add Question'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}