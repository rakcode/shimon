# Shimon - Browser Fingerprinting Library

## Overview

Shimon (`@rakcode/shimon`) is a lightweight browser fingerprinting library for JavaScript and TypeScript applications. The name **Shimon (指紋, しもん)** is Japanese for "fingerprint," symbolizing the library's core purpose of uniquely identifying users based on device and browser characteristics. It helps identify users without using cookies or local storage.

### Features

- **Framework Agnostic**: Works seamlessly with **React**, **Angular**, **Vue**, **Svelte**, and plain JavaScript/TypeScript applications.
- **Unique Fingerprint Generation**: Produces a unique **fingerprint hash** for user identification.
- **Comprehensive Data Collection**: Gathers various **browser, device, and network attributes** securely.
- **Client-Side Operation**: Fully client-side with **zero dependencies**.

## Installation

Install the package using npm or yarn:

```bash
npm install @rakcode/shimon
```

## Usage

### Basic Example (JavaScript / TypeScript)

```typescript
import { getBrowserFingerprint } from '@rakcode/shimon';

getBrowserFingerprint().then((fingerprint) => {
  console.log('Fingerprint Data:', fingerprint);
});
```

### Example Usage in React

```jsx
import React, { useEffect, useState } from 'react';
import { getBrowserFingerprint } from '@rakcode/shimon';

const FingerprintComponent = () => {
  const [fingerprint, setFingerprint] = useState(null);

  useEffect(() => {
    getBrowserFingerprint().then(setFingerprint);
  }, []);

  return <pre>{JSON.stringify(fingerprint, null, 2)}</pre>;
};

export default FingerprintComponent;
```

### Example Usage in Vanilla JavaScript

```html
<script type="module">
  import { getBrowserFingerprint } from 'https://cdn.jsdelivr.net/npm/@rakcode/shimon/+esm';

  getBrowserFingerprint().then((fingerprint) => {
    console.log('Fingerprint:', fingerprint);
  });
</script>
```

## Collected Data

Shimon collects a combination of non-sensitive browser and device properties:

- **User-Agent, Platform, CPU Cores, Touch Support**
- **Languages, Do Not Track, Network Type, RAM**
- **Screen Resolution, Color Depth, Orientation**
- **IndexedDB Support, Timezone, WebGL Renderer, Canvas Fingerprint**
- **Audio Processing Fingerprint**

These details are hashed to generate a unique identifier.

## Accuracy

Shimon generates unique fingerprints directly within the user's browser by analyzing various device and environment characteristics. However, due to the limitations of client-side fingerprinting, the accuracy is approximately 60%. This means that while Shimon can effectively differentiate many users, it may not always produce entirely unique fingerprints, especially when multiple users have identical browser versions, platforms, and hardware configurations. Developers should consider this when using Shimon for user identification or security purposes. For enhanced accuracy, it is recommended to combine Shimon with additional authentication or behavioral tracking mechanisms.

## Security Considerations

Since Shimon operates entirely on the client side, the generated fingerprints can be susceptible to spoofing and reverse engineering. This means that advanced users or malicious actors may attempt to manipulate their device attributes to produce a different fingerprint or mimic another user's identity. While Shimon provides a useful layer of identification, it should not be solely relied upon for high-security applications. Developers integrating Shimon into security-sensitive systems should consider combining it with additional verification methods, such as server-side validation, multi-factor authentication, or behavioral analysis, to enhance overall reliability.

## Use Cases

- **User Identification**: Recognize users even if they clear cookies.
- **Security & Fraud Detection**: Detect suspicious logins and bot activity.
- **Multi-Account Prevention**: Restrict duplicate account creation.
- **Personalization**: Adapt UI based on user’s device characteristics.

## Disclaimers

- **Privacy**: Ensure compliance with applicable privacy laws and regulations when using Shimon.
- **Accuracy Limitations**: Shimon's client-side nature means it may not uniquely identify all users, especially those with similar device configurations.
- **Security**: Be aware of the potential for fingerprint spoofing and reverse engineering.

## License

This project is licensed under the **MIT License**.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

## Support

For issues or feature requests, visit the [GitHub Issues](https://github.com/rakcode/shimon/issues).

## Author

Developed by **Rakesh DL** - [rakcode.com](https://rakcode.com)
