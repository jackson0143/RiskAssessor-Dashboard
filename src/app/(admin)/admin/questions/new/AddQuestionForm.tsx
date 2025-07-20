'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircleIcon, Plus, X, Loader2, ArrowLeft, FileText, Settings, Send } from 'lucide-react';
import { addQuestion } from '../actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddQuestionForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    questionText: '',
    category: '',
    questionType: '',
    weight: '',
    isMandatory: false,
    isActive: true,
    options: [''] as string[]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      //filter out blank options
      const filteredOptions = formData.options.filter(option => option.trim() !== '');
      
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('questionText', formData.questionText);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('questionType', formData.questionType);
      formDataToSend.append('weight', formData.weight);
      formDataToSend.append('isMandatory', formData.isMandatory.toString());
      formDataToSend.append('isActive', formData.isActive.toString());
      formDataToSend.append('options', JSON.stringify(filteredOptions));
      
      const result = await addQuestion(formDataToSend);
      
      if (result.success) {
        // Reset form
        setFormData({
          questionText: '',
          category: '',
          questionType: '',
          weight: '',
          isMandatory: false,
          isActive: true,
          options: ['']
        });
        
        // Redirect to questions page
        router.push('/admin/questions');
      } else {
        setError(result.message || 'Failed to add question. Please try again.');
      }
    } catch {
      setError('An error occurred while creating the question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 1) {
      setFormData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    setFormData(prev => {
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/admin/questions">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add New Question</h1>
          <p className="text-muted-foreground">
            Create a new risk assessment question for vendor questionnaires
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Question Details</span>
              </CardTitle>
              <CardDescription>
                Provide the question text, type, and basic configuration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="questionType">Question Type *</Label>
                  <Select value={formData.questionType} onValueChange={(value) => handleChange('questionType', value)} required>
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
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    type="text"
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    placeholder="Enter category"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="questionText">Question Text *</Label>
                <Input
                  type="text"
                  id="questionText"
                  value={formData.questionText}
                  onChange={(e) => handleChange('questionText', e.target.value)}
                  placeholder="Enter your question here"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Question Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Question Configuration</span>
              </CardTitle>
              <CardDescription>
                Set the question weight, requirements, and status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (0-100) *</Label>
                  <Input
                    type="number"
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleChange('weight', e.target.value)}
                    placeholder="0"
                    min="0"
                    max="100"
                
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Question Status</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => handleChange('isActive', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="isActive" className="text-sm">
                      Active Question
                    </Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isMandatory"
                    checked={formData.isMandatory}
                    onChange={(e) => handleChange('isMandatory', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="isMandatory" className="text-sm">
                    Mandatory Question
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Options (for choice questions) */}
          {(formData.questionType === 'multiple_choice' || formData.questionType === 'single_choice') && (
            <Card>
              <CardHeader>
                <CardTitle>Answer Options</CardTitle>
                <CardDescription>
                  Add the possible answer choices for this question.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1"
                      />
                      {formData.options.length > 1 && (
                        <Button
                          type="button"
                          size="icon"
                          onClick={() => removeOption(index)}
                          className="px-2 hover:bg-red-500 hover:text-white"
                        >
                          <X className="h-4 w-4" />
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
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-2">
            <Link href="/questions">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
              >
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding Question...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Add Question
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}