import { useState } from 'react';

import ComponentGalleryScreen from './gallery/ComponentGalleryScreen';
import ComponentPreviewScreen from './gallery/ComponentPreviewScreen';

export default function RootNavigator() {
  const [previewId, setPreviewId] = useState<string | null>(null);

  if (previewId) {
    return (
      <ComponentPreviewScreen id={previewId} onBack={() => setPreviewId(null)} />
    );
  }

  return <ComponentGalleryScreen onOpen={setPreviewId} />;
}
