import Widgets from 'flarum/extensions/fof-forum-widgets-core/common/extend/Widgets';

import MyWidget from './components/staffMembersWidget';

export default function (app) {
  new Widgets()
    .add({
      key: 'staffMembersWidget',
      component: MyWidget,
      isUnique: true,
      placement: 'end',
      position: 1,
      isDisabled: () => {
        const onlineUsers = app.forum.onlineUsers();
        return (!app.forum.attribute('canSearchUsers') || !(!app.forum.attribute('canViewOnlineUsersWidget') || !onlineUsers || !onlineUsers.length));
      },
    })
    .extend(app, 'justoverclock-staff-members-widget');
}
