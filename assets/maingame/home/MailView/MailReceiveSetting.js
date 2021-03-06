cc.Class({
    extends: cc.Component,

    properties: {
        button : cc.Button,
        sptCheck : cc.SpriteFrame,
        sptNotCheck : cc.SpriteFrame,

        isChecked : {
            get: function () {
                return this._isChecked;
            },
            set: function (v) {
                this._isChecked = v;
            },
            type: cc.Boolean,
        }
    },

    /*====================================================================================================
    /
    /====================================================================================================*/
    ctor () {
        this._isChecked = null;
    },

    /*====================================================================================================
    /
    /====================================================================================================*/
    onLoad () {
        this.button.node.on('click',this.OnBtnClick,this)
        this.PostIgnoreMail('status',data => {
            this._isChecked = !(data.status == "true");
        });
    },

    /*====================================================================================================
    /@action "toggle"切换状态,"status"查询当前状态
    /====================================================================================================*/
    PostIgnoreMail(action,callback) {
        cc.Linker('GetIgnoreMail',{action : action}).request(callback);
    },

    /*====================================================================================================
    /
    /====================================================================================================*/
    OnBtnClick (event) {
        this.PostIgnoreMail('toggle',data => {
            this._isChecked = !(data.status == "true");
            cc.Toast('设置成功').show();
        });
    },

    /*====================================================================================================
    /
    /====================================================================================================*/
    UpdateSprite () {
        var spt = this.node.getComponent(cc.Sprite);
        if (!spt) { return ;}
        if (this._isChecked) {
            spt.spriteFrame = this.sptCheck;
        }
        else{
            spt.spriteFrame = this.sptNotCheck;
        }
    },

    /*====================================================================================================
    /
    /====================================================================================================*/
    update () {
        this.UpdateSprite();
    }
});
