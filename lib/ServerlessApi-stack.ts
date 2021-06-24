import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as iam from '@aws-cdk/aws-iam'
import * as path from 'path'
import * as s3 from '@aws-cdk/aws-s3'
import * as apigateway from '@aws-cdk/aws-apigateway'


export class ServerlessApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  const serverlessLambdaRole = new iam.Role(this,'ServerlessLambdaRole',{
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),

  })
    const lambdaRole = new iam.Role(this, "lambdaRole", {
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
        });


    serverlessLambdaRole.addToPolicy(new iam.PolicyStatement({
      resources:['*'],
      actions: ['lambda:InvokeFunction']

    }))
  
    
    const apiServerlessLambda = new lambda.Function(this,'apiServerlessLambda', {
      runtime: lambda.Runtime.PYTHON_3_6,
      handler: 'index.handler',
      role: serverlessLambdaRole,
      code: lambda.Code.fromAsset(path.join(__dirname,'../lambda/serverlessLambdaApi')),
      timeout: cdk.Duration.seconds(400)
    })
    
  
const serverlessApiGateway = new apigateway.LambdaRestApi(this, 'myapi', {
  handler: apiServerlessLambda,
});

        const lambdaRestApi = new apigateway.LambdaRestApi(
            this,
            "lambdaRestApi",
            {
                handler: apiServerlessLambda,
                restApiName: "lambdaRestApi",
                description: "This Api is for the people!"
            }
        );
  }}
