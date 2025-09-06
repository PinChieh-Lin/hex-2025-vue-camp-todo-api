<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"><img class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""></a>
        <img class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg">
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" v-model="email"
            required>
          <label class="formControls_label" for="name">您的暱稱</label>
          <input class="formControls_input" type="text" name="name" id="name" v-model="nickname" placeholder="請輸入您的暱稱">
          <label class="formControls_label" for="pwd">密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd" v-model="password" placeholder="請輸入密碼"
            required>
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input class="formControls_input" type="password" name="pwd" id="pwd" v-model="confirmPassword"
            placeholder="請再次輸入密碼" required>
          <!-- <input class="formControls_btnSubmit" type="button" onclick="javascript:location.href='#todoListPage'"
            value="註冊帳號"> -->
          <input class="formControls_btnSubmit" type="button" @click="handleRegister" value="註冊帳號">
          <RouterLink class="formControls_btnLink" to="/login">登入</RouterLink>
        </form>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../../utils/api';
const router = useRouter();

// 表單資料
const email = ref('test123@gamil.com')
const nickname = ref('test')
const password = ref('')
const confirmPassword = ref('')

// 處理註冊
const handleRegister = async () => {
  // TODO 驗證表單
  // ( 請輸入有效的 Email 格式 / 不可空 / 字元長度檢查 length / 密碼是否相同)
  if (!email.value || !nickname.value || !password.value || !confirmPassword.value) {
    alert('所有欄位都必須填寫');
    return;
  }
  // Email 格式驗證
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    alert('請輸入有效的 Email 格式');
    return;
  }
  // 密碼長度驗證
  if (password.value.length < 6) {
    alert('密碼長度需至少 6 個字元');
    return;
  }
  // 密碼一致性驗證
  if (password.value !== confirmPassword.value) {
    alert('兩次輸入的密碼不一致');
    return;
  }
  try {
    // call register api
    await register(email.value, nickname.value, password.value,)
    alert('註冊成功')
    // 跳轉至 login page
    router.push('/login')
  } catch (error) {
    alert(error.response.data.message)
    // alert(`發生錯誤: ${error.response.data.message}`)
  }
}


</script>
