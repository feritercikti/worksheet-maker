import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import { WorkSheetProvider } from '../context/WorkSheetContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WorkSheetProvider>
      <Component {...pageProps} />
    </WorkSheetProvider>
  );
}
