import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as iam from '@aws-cdk/aws-iam'
import * as path from 'path'
import * as s3 from '@aws-cdk/aws-s3'


export class ServerlessApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaRole = new iam.Role(this,'lambdaRole',{
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),

    })

    lambdaRole.addToPolicy(new iam.PolicyStatement({
      resources:['*'],
      actions: ['lambda:InvokeFunction']

    }))
  
    
    const apiServerlessLambda = new lambda.Function(this,'apiServerlessLambda', {
      runtime: lambda.Runtime.PYTHON_3_6,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname,'lambda-handler'))
    })
    
 

}}
