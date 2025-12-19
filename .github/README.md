# GitHub Configuration

## GitHub Pages Deployment

This repository uses GitHub Actions to automatically deploy the site to GitHub Pages.

### Workflow: `deploy-pages.yml`

The workflow automatically deploys the static site from the `docs/` folder to GitHub Pages when:
- Code is pushed to the `main` branch
- Manually triggered via workflow dispatch

### Setup Requirements

After merging this PR, ensure GitHub Pages is configured in your repository:

1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
3. Save changes

The site will be available at: `https://ap0ught.github.io/solarjetmanpasswordgenerator/`

### Workflow Features

- ✅ Automatic deployment on push to `main`
- ✅ Manual deployment option via Actions tab
- ✅ Uses official GitHub Actions (v4)
- ✅ Proper permissions for secure deployment
- ✅ Concurrency control to prevent deployment conflicts

### Troubleshooting

If the deployment fails:
1. Check the Actions tab for error messages
2. Verify Pages is enabled in Settings
3. Ensure the `docs/` folder contains the site files
4. Check that the workflow has proper permissions

For more information, see: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow
