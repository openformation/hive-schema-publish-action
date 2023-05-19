import * as core from '@actions/core'
import {existsSync} from 'fs'
import {execa} from 'execa'

async function run(): Promise<void> {
  try {
    // Inputs
    const serviceName = core.getInput('service-name', {required: true})
    if (!serviceName || serviceName.length === 0) {
      throw new Error('Input "service-name" is required')
    }

    const serviceUrl = core.getInput('service-url', {required: true})
    if (!serviceUrl || serviceUrl.length === 0) {
      throw new Error('Input "service-url" is required')
    }

    const schemaPath = core.getInput('schema-path', {required: true})
    if (!schemaPath || schemaPath.length === 0) {
      throw new Error('Input "schema-path" is required')
    }

    const registryToken = core.getInput('hive-registry-access-token', {
      required: true
    })
    if (!registryToken || registryToken.length === 0) {
      throw new Error('Input "hive-registry-access-token" is required')
    }

    const registryEndpoint = 'https://registry.hive.openformation.io/graphql'

    // Check if schema file exists
    if (!existsSync(schemaPath)) {
      throw new Error('The schema file could not be found at the provided path')
    }

    // Install Hive CLI
    const curl = execa('curl', ['-sSL', 'https://graphql-hive.com/install.sh'])
    if (!curl.pipeStdout) {
      throw new Error('Hive CLI could not be installed.')
    }
    await curl.pipeStdout(execa('sh'))

    core.debug('Hive CLI installed')

    // Publish schema
    const {stdout: result} = await execa(
      'hive',
      [
        'schema:publish',
        schemaPath,
        '--service',
        serviceName,
        '--registry.endpoint',
        registryEndpoint,
        '--url',
        serviceUrl
      ],
      {
        env: {
          HIVE_TOKEN: registryToken
        }
      }
    )

    core.debug(result)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
