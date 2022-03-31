import type { AWS } from '@serverless/typescript';
import create_book from '@functions/create_book'

const STAGE = '${opt:stage, "dev"}'
const serverlessConfiguration: AWS = {
  service: 'demo',
  frameworkVersion: '2',
  plugins: [
    'serverless-webpack',
    'serverless-layers',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-northeast-1',
    architecture: 'arm64',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      STAGE: STAGE,
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    stage: STAGE,
    deploymentBucket: {
      name: 'serverless-template-bucket',
    },
    stackTags: {
      project: 'demo',
      env: STAGE,
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:*'
            ],
            Resource: `arn:aws:dynamodb:ap-northeast-1:*:table/${STAGE}-book`,
          },
        ],
      },
    },
    apiName: `${STAGE}-book-api`
  },
  package: { 
    individually: true,
  },
  // import the function via paths
  functions: {
    create_book,
  },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: false,
    },
    'serverless-layers': [
      {
        commonLibs: {
          dependenciesPath: './package.json',
        },
      },
    ],
  },
  useDotenv: true,
  resources: {
    Resources: {
      BookTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: `${STAGE}-book`,
          PointInTimeRecoverySpecification: {
            PointInTimeRecoveryEnabled: true,
          },
          BillingMode: 'PAY_PER_REQUEST',
          SSESpecification: {
            SSEEnabled: true,
            SSEType: 'KMS',
          },
          AttributeDefinitions: [
            {
              AttributeName: 'book_id',
              AttributeType: 'S',
            },
            // {
            //   AttributeName: 'name',
            //   AttributeType: 'S',
            // },
          ],
          KeySchema: [
            {
              AttributeName: 'book_id',
              KeyType: 'HASH',
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
