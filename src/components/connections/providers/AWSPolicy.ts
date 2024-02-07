export const AWSPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "VisualEditor0",
          "Effect": "Allow",
          "Action": [
              "ce:GetCostAndUsageWithResources",
              "ce:GetCostForecast",
              "ec2:DescribeInstances"
          ],
          "Resource": "*"
      }
  ]
}`;
