#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ServerlessApiStack } from '../lib/serverless_api-stack';

const app = new cdk.App();
new ServerlessApiStack(app, 'ServerlessApiStack');
