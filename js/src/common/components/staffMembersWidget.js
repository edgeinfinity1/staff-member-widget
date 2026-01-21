import Widget from 'flarum/extensions/afrux-forum-widgets-core/common/components/Widget';
import app from 'flarum/forum/app';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import avatar from 'flarum/common/helpers/avatar';
import Tooltip from 'flarum/common/components/Tooltip';
import Link from 'flarum/common/components/Link';

export default class MyWidget extends Widget {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
  }

  oncreate(vnode) {
    const getGroupFromExtensionSettings = app.forum.attribute('justoverclock-staff-members-widget.selectedGroups') || 1
    const getUserGroup = app.store
      .find('users', {
        filter: { group: `${getGroupFromExtensionSettings}` },
      })
      .then((results) => {
        this.userGroups = results;
        this.loading = false;
        m.redraw();
      });
  }

  className() {
    return 'staff-members-widget';
  }

  icon() {
    return 'fas fa-user-secret';
  }

  title() {
    return app.translator.trans('justoverclock-staff-members-widget.forum.widgetTitle');
  }

  content() {
    if (this.loading) {
      return <LoadingIndicator />;
    }
    return (
      <div className="staff-members-container">
        <div>
          {this.userGroups.map((user) => {
            // const group = user.groups();
            const groups = user.groups() || [];
            return (
              <div className="staff-members-flex">
                <div className="staffMemberAvatar">
                  <Tooltip text={user.displayName()}>{avatar(user)}</Tooltip>
                </div>
                <div className="staff-members-groups">
                  <div className="staff-members-details">
                    <Link href={app.route.user(user)} className="staffmemberslink">
                      <strong>{user.username()}</strong>
                    </Link>
                  </div>
                    {groups.map((group, index) => (
                      <span className="staff-members-group" key={group.id()}>
                        {group.attribute('nameSingular')}
                        {index < groups.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
