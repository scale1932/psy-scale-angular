# Internationalization (i18n) Messages

This directory contains the internationalization message files for the application.

## File Structure

- `messages.en.json` - English translations
- `messages.zh.json` - Chinese translations

## Usage

To add a new translation:
1. Add the key-value pair to both English and Chinese files
2. Ensure the key structure follows the pattern: `feature.section.key`
3. Use meaningful and consistent key names

## Example

In your component or service, you can use the translations like this:

```typescript
// Import the translate service
import { TranslateService } from '@ngx-translate/core';

// In your component
constructor(private translate: TranslateService) {}

// Use in template or component code
this.translate.instant('auth.login');
```

## Key Naming Convention

- Use lowercase letters
- Separate words with dots
- Follow the pattern: `feature.section.specificKey`
- Example: `auth.login.username`, `common.buttons.save`