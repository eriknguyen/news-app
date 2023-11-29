import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'

export default defineConfig({
  projectName: 'News Aggregator',
  logicalId: 'news-app',
  repoUrl: 'https://github.com/eriknguyen/news-app',
  checks: {
    activated: true,
    muted: false,
    /* A default for how often your Check should run in minutes */
    frequency: Frequency.EVERY_5M,
    /* Checkly data centers to run your Checks as monitors */
    locations: ['ap-southeast-1', 'ap-southeast-3'],
    tags: ['website', 'api'],
    ignoreDirectoriesMatch: [],
    /** The Checkly Runtime identifier, determining npm packages and the Node.js version available at runtime.
     * See https://www.checklyhq.com/docs/cli/npm-packages/
     */
    runtimeId: '2023.02',
    /* A glob pattern that matches the Checks inside your repo, see https://www.checklyhq.com/docs/cli/using-check-test-match/ */
    checkMatch: '**/__checks__/**/*.check.ts',
    browserChecks: {
      frequency: Frequency.EVERY_24H,
      /* A glob pattern matches any Playwright .spec.js files and automagically creates a Browser Check. This way, you
       * can just write native Playwright code. See https://www.checklyhq.com/docs/cli/using-check-test-match/
       * */
      testMatch: '**/__checks__/**/*.spec.ts',
    },
  },
  cli: {
    /* The default datacenter location to use when running npx checkly test */
    runLocation: 'ap-southeast-1',
    /* An array of default reporters to use when a reporter is not specified with the "--reporter" flag */
    reporters: ['list'],
  },
})
