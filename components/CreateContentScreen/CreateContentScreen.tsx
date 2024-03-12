import { useState } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { RecordStep } from './RecordStep';
import { ReviewStep } from './ReviewStep';
import { PublishStep } from './PublishStep';
import { SuccessStep } from './SuccessStep';
import { CreateContentStep } from '../../util/types';

export const CreateContentScreen = () => {
  const [step, setStep] = useState(CreateContentStep.record);
  const [videoUri, setVideoUri] = useState('');

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        switch (step) {
          case CreateContentStep.record: {
            return false;
          }

          case CreateContentStep.review: {
            setVideoUri('');
            setStep(CreateContentStep.record);
            return true;
          }

          case CreateContentStep.publish: {
            setStep(CreateContentStep.review);
            return true;
          }

          case CreateContentStep.success: {
            return true;
          }
        }
      },
    );

    return () => backHandler.remove();
  });

  switch (step) {
    case CreateContentStep.record: {
      return <RecordStep setStep={setStep} setVideoUri={setVideoUri} />;
    }

    case CreateContentStep.review: {
      return (
        <ReviewStep
          videoUri={videoUri}
          setStep={setStep}
          setVideoUri={setVideoUri}
        />
      );
    }

    case CreateContentStep.publish: {
      return <PublishStep videoUri={videoUri} setStep={setStep} />;
    }

    case CreateContentStep.success: {
      return <SuccessStep setStep={setStep} setVideoUri={setVideoUri} />;
    }
  }
};
