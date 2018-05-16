 <template>
  <tabbar class="layout-tabbar"
    style="position:fixed"
    v-model='moduleIndex'>
    <tabbar-item v-for="(el,index) in tabdata"
      :key="index"
      :link="linkdomain+el.tabkey+'.html'">
      <img slot="icon"
        :src="el.tabicon">
      <img slot="icon-active"
        :src="el.tabActiveicon">
      <span slot="label">{{ el.tabname }}</span>
    </tabbar-item>
  </tabbar>

</template>

<script>
import config from '@/utils/config';
import { mapState } from 'vuex';
import { Tabbar, TabbarItem } from 'vux';
import reserveIcon from '@/assets/img/icon_API.png';
import reserveIconActive from '@/assets/img/icon_API_HL.png';
import libraryIcon from '@/assets/img/icon_component.png';
import libraryIconActive from '@/assets/img/icon_component_HL.png';
import mycenterIcon from '@/assets/img/wechat.png';
import mycenterIconActive from '@/assets/img/wechat_HL.png';
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      linkdomain: '',
      tabdata: [
        {
          tabname: '预约打印',
          tabicon: reserveIcon,
          tabActiveicon: reserveIconActive,
          tabkey: 'reserve'
        },
        {
          tabname: '资料库',
          tabicon: libraryIcon,
          tabActiveicon: libraryIconActive,
          tabkey: 'library'
        },
        {
          tabname: '我的',
          tabicon: mycenterIcon,
          tabActiveicon: mycenterIconActive,
          tabkey: 'mycenter'
        }
      ]
    };
  },
  created() {
    this.linkdomain = config.linkdomain;
  },
  computed: {
    moduleIndex: {
      get: function() {
        let idx = 0;
        this.tabdata.forEach((element, index) => {
          if (element.tabkey == this.$store.state.modulekey) {
            idx = index;
          }
        });
        return idx;
      },
      set: function(newValue) {}
    },
    ...mapState({
      modulekey: (state) => state.moduledata.modulekey,
      g_config: (state) => state.g_config
    })
  }
};
</script>
