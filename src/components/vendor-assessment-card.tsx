"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { VendorReview } from "@prisma/client";
import { generateSignedUrl } from "@/app/(admin)/admin/forms/actions";
import { useState, useEffect } from "react";

interface VendorReviewCardProps {
  review: VendorReview;
  index: number;
}

export function VendorReviewCard({ review }: VendorReviewCardProps) {
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);

  // find a fix to this, it's a bit of a cheaty way
  useEffect(() => {
    if (review.isoCertUrl && !certificateUrl) {
      generateSignedUrl(review.isoCertUrl).then(result => {
        if (result.success) {
          setCertificateUrl(result.signedUrl);
        }
      }).catch(error => {
        console.error('Error generating signed URL:', error);
      });
    }
  }, [review.isoCertUrl, certificateUrl]);
 
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

  const getRiskColor = (rating: string) => {
    switch (rating) {
      case 'LOW': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'HIGH': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMaturityColor = (rating: string) => {
    switch (rating) {
      case 'HIGH': return 'bg-green-100 text-green-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };




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
          <div className="flex flex-col gap-2">
            {review.riskRating && (
              <div className="text-center">
                <div className="bg-background rounded-lg p-3 shadow-sm border">
                  <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Risk Level</div>
                  <Badge className={`text-sm px-3 py-1 font-semibold ${getRiskColor(review.riskRating)}`}>
                    {review.riskRating}
                  </Badge>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              {review.maturityRating && (
                <div className="text-center">
                  <div className="bg-background rounded-lg p-2 shadow-sm border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Maturity</div>
                    <Badge className={`text-xs px-2 py-1 font-semibold ${getMaturityColor(review.maturityRating)}`}>
                      {review.maturityRating}
                    </Badge>
                  </div>
                </div>
              )}
              {review.impactRating && (
                <div className="text-center">
                  <div className="bg-background rounded-lg p-2 shadow-sm border">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Impact</div>
                    <Badge className={`text-xs px-2 py-1 font-semibold ${getRiskColor(review.impactRating)}`}>
                      {review.impactRating}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
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
          <CardTitle className="text-lg mb-4">Security Maturity Assessment</CardTitle>
          <div className="space-y-4">
            <QuestionDisplay question="Do you perform vulnerability scans or penetration tests at least quarterly?">
              <YesNoBadge value={review.performsVulnerabilityScan} />
            </QuestionDisplay>
            <QuestionDisplay question="Do you enforce multi-factor authentication (MFA) for all user logins?">
              <YesNoBadge value={review.usesMFA} />
            </QuestionDisplay>
            <QuestionDisplay question="Do you use automated role-based (or attribute-based) access controls with regular audits?">
              <YesNoBadge value={review.usesAutomatedAccessControl} />
            </QuestionDisplay>
            <QuestionDisplay question="Do you maintain a documented Incident Response Plan that&apos;s been tested within the last 12 months?">
              <YesNoBadge value={review.maintainsIncidentResponsePlan} />
            </QuestionDisplay>
          </div>
          {review.additionalNotesMaturity && (
            <div className="mt-4">
              <QuestionDisplay question="Additional Information about Security Maturity">
                <AnswerDisplay value={review.additionalNotesMaturity} />
              </QuestionDisplay>
            </div>
          )}
        </div>

        <Separator />

        {/* Impact Assessment */}
        <div>
          <CardTitle className="text-lg mb-4">Impact Assessment</CardTitle>
          <div className="space-y-4">
            <QuestionDisplay question="Do you process or store real-time operational or production-control data for Allnex?">
              <YesNoBadge value={review.requireOperationData} />
            </QuestionDisplay>
            <QuestionDisplay question="Do you process or store financial records or proprietary intellectual property?">
              <YesNoBadge value={review.requireFinancialData} />
            </QuestionDisplay>
            <QuestionDisplay question="Do you process or store employee or customer personally identifiable information?">
              <YesNoBadge value={review.requirePersonalData} />
            </QuestionDisplay>
            <QuestionDisplay question="Could an interruption to your service cause a material business outage at Allnex?">
              <YesNoBadge value={review.canCauseBusinessOutage} />
            </QuestionDisplay>
            <QuestionDisplay question="Do you enforce Role-Based Access Control (or equivalent) on critical systems?">
              <YesNoBadge value={review.roleBasedAccess} />
            </QuestionDisplay>
          </div>
          {review.additionalNotesImpact && (
            <div className="mt-4">
              <QuestionDisplay question="Additional Information about Impacts">
                <AnswerDisplay value={review.additionalNotesImpact} />
              </QuestionDisplay>
            </div>
          )}
        </div>


       
      </CardContent>
    </Card>
  );
}