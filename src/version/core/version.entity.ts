export class ApiVersion {
  commitVersion: string;
  commitDate: string;
  apiVersion: string;
  dateVersion: string;
  constructor(apiVersionContent: string) {
    this.commitVersion = '';
    this.commitDate = '';
    this.apiVersion = '';
    this.dateVersion = '';
    // Parse the content to extract the fields
    const lines = apiVersionContent.trim().split('\n');
    lines.forEach((line) => {
      const [key, value] = line.split('=');
      switch (key.trim()) {
        case 'commit_version':
          this.commitVersion = value.trim();
          break;
        case 'api_version':
          this.apiVersion = value.trim();
          break;
        case 'date_version':
          this.dateVersion = value.trim();
          break;
        case 'commit_date':
          this.commitDate = value.trim();
          break;
        default:
          break;
      }
    });
  }
}
