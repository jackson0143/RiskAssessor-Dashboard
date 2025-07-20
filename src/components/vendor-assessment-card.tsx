"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { VendorReview } from "@prisma/client";
import { generateSignedUrl } from "@/app/(admin)/admin/forms/actions";
import { useState, useEffect } from "react";

interface VendorReviewCardProps {
  review: VendorReview;
  index: number;
}

export function VendorReviewCard({ review }: VendorReviewCardProps) {
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);

  // Server action to actually generate the signed url, workaround for the client side component
  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (review.isoCertUrl) {
        try {
          const result = await generateSignedUrl(review.isoCertUrl);
          if (result.success) {
            setCertificateUrl(result.signedUrl);
          }
        } catch (error) {
          console.error('Error generating signed URL:', error);
        }
      }
    };

    fetchSignedUrl();
    //we render when the review.isoCertUrl changes, but technically it shouldnt change anyways, so we can leave it empty? maybe
  }, [review.isoCertUrl]);
 
  const YesNoBadge = ({ value }: { value: boolean }) => (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
      value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {value ? '✓ Yes' : '✗ No'}
    </div>
  );

  
  const AnswerDisplay = ({ value }: { value: string | null }) => (
    <p className="text-base text-muted-foreground bg-muted px-3 py-2 rounded-md">
      {value || 'Not provided'}
    </p>
  );

  
  const QuestionDisplay = ({ question, children }: { question: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{question}</p>
      {children}
    </div>
  );




  return (
    <Card>
      
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Assessment</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Completed on {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
          {/* {review.reviewScore && (
            <div className="text-center">
              <div className="bg-background rounded-lg p-4 shadow-sm border">
                <div className="text-2xl font-bold">{review.reviewScore}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Risk Score</div>
                <div className={`mt-1 text-xs px-2 py-1 rounded-full ${riskLevel?.class}`}>
                  {riskLevel?.text}
                </div>
              </div>
            </div>
          )} */}
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-8">
        {/* Company Information */}
        <div>
          <CardTitle className="text-lg mb-4">Company Information</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <QuestionDisplay question="What is your company name?">
                <AnswerDisplay value={review.companyName} />
              </QuestionDisplay>
              <QuestionDisplay question="What industry are you in?">
                <AnswerDisplay value={review.companyIndustry} />
              </QuestionDisplay>
            </div>
            <div className="space-y-4">
              <QuestionDisplay question="When was this assessment completed?">
                <AnswerDisplay value={new Date(review.lastReviewDate).toLocaleDateString()} />
              </QuestionDisplay>
              <QuestionDisplay question="When is the next review due?">
                <AnswerDisplay value={new Date(review.nextReviewDate).toLocaleDateString()} />
              </QuestionDisplay>
            </div>
          </div>
        </div>

        <Separator />

        {/* ISO-27001 Certification */}
        <div>
          <CardTitle className="text-lg mb-4">ISO-27001 Certification</CardTitle>
          <div className="space-y-4">
            <QuestionDisplay question="Do you have an ISO-27001 certificate?">
              <YesNoBadge value={review.hasISO27001} />
            </QuestionDisplay>
            
            {review.hasISO27001 && (
              <>
                <QuestionDisplay question="When does your certificate expire?">
                  <AnswerDisplay value={review.isoCertExpiryDate ? new Date(review.isoCertExpiryDate).toLocaleDateString() : null} />
                </QuestionDisplay>
                {review.isoCertUrl && certificateUrl && (
                  <QuestionDisplay question="Certificate file">
                    <a 
                      href={certificateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                    >
                      📄 View Certificate
                    </a>
                  </QuestionDisplay>
                )}
              </>
            )}
          </div>
        </div>

        <Separator />

       
        <div>
          <CardTitle className="text-lg mb-4">Security Maturity Questions</CardTitle>
          <div className="space-y-4">
            <QuestionDisplay question="Do you use Single Sign-On (SSO)?">
              <YesNoBadge value={review.usesSSO} />
            </QuestionDisplay>
            <QuestionDisplay question="Do you use Multi-Factor Authentication (MFA)?">
              <YesNoBadge value={review.usesMFA} />
            </QuestionDisplay>
            <QuestionDisplay question="Do you use individual accounts (no sharing)?">
              <YesNoBadge value={review.individualAccounts} />
            </QuestionDisplay>
            <QuestionDisplay question="Do you enforce role-based access controls?">
              <YesNoBadge value={review.roleBasedAccess} />
            </QuestionDisplay>
          </div>
        </div>

        {/* Additional Notes */}
        {review.reviewNotes && (
          <>
            <Separator />
            <div>
              <CardTitle className="text-lg mb-4">Additional Information</CardTitle>
              <QuestionDisplay question="Any additional notes or comments?">
                <AnswerDisplay value={review.reviewNotes} />
              </QuestionDisplay>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}