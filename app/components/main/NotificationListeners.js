import firebase from 'react-native-firebase';
import { colors } from '../../config';

export const onNotifications = firebase.notifications().onNotification((notification) => {
  // set up the notification
  notification
  .android.setColor(colors.primary.normal)
  .android.setAutoCancel(true)
  .android.setLargeIcon(notification.data.icon)
  .android.setChannelId(notification.data.channel);

  if (!notification.android.channelId) {
    notification.android.setChannelId('misc_channel');
  } else {
    const remoteInput = new firebase.notifications.Android.RemoteInput('input');
    remoteInput.setLabel('Reply');

    const action = new firebase.notifications.Android.Action('reply', 'check-mark', `Reply to ${notification.title}`);
    action
    .setSemanticAction(firebase.notifications.Android.SemanticAction.Reply)
    .addRemoteInput(remoteInput);

    notification.android.addAction(action);
  }

  // display the notification
  firebase.notifications().displayNotification(notification);
});

export const onOpenNotification = firebase.notifications().onNotificationOpened((notificationOpen) => {
  // get the user input
  const results = notificationOpen.results;
  console.log(results);

  // action that is being triggered
  const action = notificationOpen.action;
  console.log(action);

  // get the notification info
  const notification = notificationOpen.notification;
  console.log(notification.android);
});
