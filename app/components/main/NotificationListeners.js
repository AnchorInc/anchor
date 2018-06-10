import firebase from 'react-native-firebase';
import { colors } from '../../config';

export const onNotifications = firebase.notifications().onNotification((notification) => {
  // set up the notification
  notification
  .android.setSmallIcon('@drawable/logo')
  .android.setColorized(true)
  .android.setColor(colors.primary.light)
  .android.setAutoCancel(true);

  if (!notification.android.channelId) {
    notification.android.setChannelId('misc-channel');
  } else {
    const remoteInput = new firebase.notifications.Android.RemoteInput('input');
    remoteInput.setLabel('Reply');

    const action = new firebase.notifications.Android.Action('reply', 'check-mark', 'reply');
    action
    .setSemanticAction(firebase.notifications.Android.SemanticAction.Reply)
    .addRemoteInput(remoteInput);

    notification
    .android.addAction(action);
  }

  // display the notification
  firebase.notifications().displayNotification(notification);
});

export const onOpenNotification = firebase.notifications().onNotificationOpened((notificationOpen) => {
  // get the user input
  const results = notificationOpen.results;
  console.log(results.input);

  // action that is being triggered
  const action = notificationOpen.action;
  console.log(action);

  // get the notification info
  const notification = notificationOpen.notification;
  console.log(notification.android);
});
