import { Card, CardContent } from "@/components/ui/card";
import { VendorReview } from "@prisma/client";

interface VendorReviewCardProps {
  review: VendorReview;
  index: number;
}

export function VendorReviewCard({ review }: VendorReviewCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Header with prominent score */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Assessment</h3>
            <p className="text-sm text-gray-600 mt-1">
              Completed on {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-center">
            {review.reviewScore && (
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="text-2xl font-bold text-gray-900">{review.reviewScore}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Risk Score</div>
                <div className={`mt-1 text-xs px-2 py-1 rounded-full ${
                  review.reviewScore >= 80 ? 'bg-red-100 text-red-800' :
                  review.reviewScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {review.reviewScore >= 80 ? 'High Risk' :
                   review.reviewScore >= 60 ? 'Medium Risk' : 'Low Risk'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Company Information */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">What is your company name?</p>
                <p className="text-base text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {review.companyName || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">What industry are you in?</p>
                <p className="text-base text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {review.companyIndustry || 'Not specified'}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">When was this assessment completed?</p>
                <p className="text-base text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {new Date(review.lastReviewDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">When is the next review due?</p>
                <p className="text-base text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {new Date(review.nextReviewDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ISO-27001 Certification */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">ISO-27001 Certification</h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Do you have an ISO-27001 certificate?</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                review.hasISO27001 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {review.hasISO27001 ? '✓ Yes' : '✗ No'}
              </div>
            </div>
            
            {review.hasISO27001 && (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">When does your certificate expire?</p>
                  <p className="text-base text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                    {review.isoCertExpiryDate 
                      ? new Date(review.isoCertExpiryDate).toLocaleDateString()
                      : 'Not specified'
                    }
                  </p>
                </div>
                {review.isoCertUrl && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Certificate file</p>
                    <a 
                      href={review.isoCertUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      📄 View Certificate
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* NIS2 Compliance */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">NIS2 Compliance Requirements</h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Do you use Single Sign-On (SSO)?</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                review.usesSSO 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {review.usesSSO ? '✓ Yes' : '✗ No'}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Do you use Multi-Factor Authentication (MFA)?</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                review.usesMFA 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {review.usesMFA ? '✓ Yes' : '✗ No'}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Do you use individual accounts (no sharing)?</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                review.individualAccounts 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {review.individualAccounts ? '✓ Yes' : '✗ No'}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Do you enforce role-based access controls?</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                review.roleBasedAccess 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {review.roleBasedAccess ? '✓ Yes' : '✗ No'}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        {review.reviewNotes && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Any additional notes or comments?</p>
              <p className="text-base text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                {review.reviewNotes}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}