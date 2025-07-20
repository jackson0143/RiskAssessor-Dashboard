'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();


export async function addQuestion(formData: FormData) {
  const questionText = formData.get('questionText') as string;
  const category = formData.get('category') as string;
  const questionType = formData.get('questionType') as string;
  const weight = formData.get('weight') as string;
  const isMandatory = formData.get('isMandatory') === 'true';
  const isActive = formData.get('isActive') === 'true';
  const options = formData.get('options') as string;

    //Fields that are required
  if (!questionText || !category || !questionType) {
    return { success: false, message: 'Missing required fields' };
  }

  const weightValue = parseInt(weight);
  if (isNaN(weightValue) || weightValue < 0 || weightValue > 100) {
    return { success: false, message: 'Weight must be a number between 0 and 100' };
  }

  // JSON
  let optionsArray: string[] = [];
  if (options) {
    try {
      optionsArray = JSON.parse(options);
    } catch {
      optionsArray = [];
    }
  }

  const questionTypeMap: Record<string, 'MULTIPLE_CHOICE' | 'SINGLE_CHOICE' | 'TEXT' | 'NUMERIC' | 'BOOLEAN' | 'FILE_UPLOAD' | 'DATE'> = {
    'multiple_choice': 'MULTIPLE_CHOICE',
    'single_choice': 'SINGLE_CHOICE',
    'text': 'TEXT',
    'number': 'NUMERIC',
    'boolean': 'BOOLEAN',
    'file_upload': 'FILE_UPLOAD',
    'date': 'DATE'
  };

  const mappedQuestionType = questionTypeMap[questionType];
  if (!mappedQuestionType) {
    return { success: false, message: 'Invalid question type' };
  }

  try {
    await prisma.question.create({
      data: {
        questionText,
        category,
        questionType: mappedQuestionType,
        weight: weightValue,
        isMandatory,
        isActive,
        options: optionsArray
      }
    });
    
    revalidatePath('/questions');

    return { success: true, message: 'Question added successfully' };
  } catch (error) {
    console.error('Error adding question:', error);
    return { success: false, message: 'Failed to add question' };
  }
}

export async function getAllQuestions() {
  try {
    const questions = await prisma.question.findMany({
        where: {
            isActive: true
        },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return { success: true, questions };
  } catch (error) {
    console.error('Error fetching questions:', error);
    return { success: false, error: 'Failed to fetch questions' };
  }
}

export async function deleteQuestion(questionId: string) {
  try {
    // Don't actually delete, just set isActive to false. That way we can always just jump back to DB 
    await prisma.question.update({
      where: {
        id: questionId
      },
      data: {
        isActive: false
      }
    });
    
    revalidatePath('/questions');
    revalidatePath('/dashboard');
    return { success: true, message: 'Question deleted successfully' };
  } catch (error) {
    console.error('Error deleting question:', error);
    return { success: false, message: 'Failed to delete question' };
  }
}

