import React, { Suspense } from 'react';
import KeyChangeUI from './KeyChangeUI';

export default function page() {
    return (
        <Suspense fallback={<p>Loading translator...</p>}>
            <KeyChangeUI />
        </Suspense>
    );
}
