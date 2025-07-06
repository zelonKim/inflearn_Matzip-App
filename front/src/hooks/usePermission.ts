import { alerts } from '@/constants';
import {useEffect} from 'react';
import {Alert, Linking, Permission, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};




function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';

      const permissionOS = isAndroid ? androidPermissions : iosPermissions;

      const checked = await check(permissionOS[type]);


      const showPermissionAlert = () => {
        Alert.alert(
          alerts.[`${type}_PERMISSION`].TITLE,
          alerts.[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: '�����ϱ�',
              onPress: () => Linking.openSettings(), 
            },
            {
              text: '���',
              style: 'cancel',
            },
          ],
        );
      };



      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
            return;
          }
          await request(permissionOS[type]);
          break;

        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;

        default:
          break;
      }
    })();
    
  }, []);
}
export default usePermission;
