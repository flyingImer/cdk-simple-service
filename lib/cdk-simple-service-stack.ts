import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkSimpleServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkSimpleServiceQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    new Table(this, 'TaskProfile', {
      partitionKey: {
        name: 'taskId',
        type: AttributeType.STRING,
      },
    });
    const handler = new NodejsFunction(this, 'ServiceHandler', {
      entry: 'lib/lambda/service-handler.ts',
    });

    new LambdaRestApi(this, 'ServiceApi', {
      handler,
    });
  }
}
