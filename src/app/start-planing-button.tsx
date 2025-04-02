'use client';

import { api } from '@/api-client';
import { Button } from '@/components/button';
import { getText } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import css from './start-planing-button.module.css';

export var StartPlaningButton = () => {
  var router = useRouter();
  var { 0: loading, 1: setLoading } = useState(false);

  var handleGetStarted = async () => {
    setLoading(true);
    try {
      var room = await api.createRoom();
      router.push(`/r/${room.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="button" className={css.button} onClick={handleGetStarted} disabled={loading}>
      {getText('b.start_planing')}
    </Button>
  );
};
