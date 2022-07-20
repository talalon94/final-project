import '../styles/globals.css';
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Layout from './components/Layout';

const gameScreenStyles = css`
  border: 5px solid black;
  top: 50%;
  left: 50%;
  position: absolute;
  width: 640px;
  height: 380px;
  transform: translate(-50%, -50%);
  z-index: -1000;
`;
const borderStyles = css`
  border: 200px solid white;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  position: absolute;
  width: 650px;
  height: 390px;
  transform: translate(-50%, -50%);
  z-index: 100000000000000;
  pointer-events: none;
`;

const startPageLinkStyles = css`
  position: absolute;
  top: 75%;
  left: 48%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 400px;
  gap: 10px;

  img {
    cursor: pointer;
  }
  > .hoverElement {
    margin-top: 100px;
    font-size: 10px;
  }

  > .hoverElement > .hovertext {
    position: absolute;
    bottom: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    visibility: hidden;
  }

  .hoverElement:hover .hovertext {
    visibility: visible;
  }
`;

function App({ Component, pageProps }) {
  const [user, setUser] = useState();

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profile');

    const profileResponseBody = await profileResponse.json();

    if (!('errors' in profileResponseBody)) {
      setUser(profileResponseBody.user);
    } else {
      profileResponseBody.errors.forEach((error) => console.log(error.message));
      setUser(undefined);
    }
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);

  return (
    <div>
      {[[], false, null, undefined]}
      <Head>
        <title>The Smoothie Queen</title>
        <meta
          name="description"
          content="The Smoothie Queen is a game in which you create smoothies for drag queens before they become angry."
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Layout user={user}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
        <div css={borderStyles}>
          <Image src="/border.png" width="650" height="390" />
        </div>
        <div css={gameScreenStyles}>
          {' '}
          <Image src="/app-background.png" width="640" height="380" />
          <div css={startPageLinkStyles}>
            <Link href="/register">
              <Image
                src="/register-btn.png"
                alt="register button"
                width="388"
                height="155"
              />
            </Link>
            <Link href="/login">
              <Image
                src="/login-btn.png"
                alt="login button"
                width="388"
                height="155"
              />
            </Link>
            <Link className="hoverElement" href="/game">
              <Image
                src="/guest-btn.png"
                alt="continue as guest button"
                width="388"
                height="155"
              />
            </Link>
            {/* <p className="hovertext">Your score won't be saved</p> */}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default App;
