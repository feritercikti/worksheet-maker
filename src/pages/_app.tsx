import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import { ColorProvider } from './context/ColorContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorProvider>
      <Component {...pageProps} />{' '}
    </ColorProvider>
  );
}
