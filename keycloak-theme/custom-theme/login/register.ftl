<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','username','password','password-confirm'); section>
    <#if section = "header">
		<#--TODO: Replace removed image-->
		<img class="logo-img" alt="logo" src="${url.resourcesPath}/img/">
        ${msg("registerTitle")}
    <#elseif section = "form">
		<form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">

            <#if !realm.registrationEmailAsUsername>
				<div class="${properties.kcFormGroupClass!}">

					<div class="${properties.kcInputWrapperClass!}">
						<input placeholder="User-ID" type="text" id="username" class="${properties.kcInputClass!}"
							   name="username"
							   value="${(register.formData.username!'')}" autocomplete="username"
							   aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
						/>

                        <#if messagesPerField.existsError('username')>
							<span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('username'))?no_esc}
                            </span>
                        </#if>
					</div>
				</div>
            </#if>

            <#if passwordRequired??>
				<div class="${properties.kcFormGroupClass!}">

					<div class="${properties.kcInputWrapperClass!}">
						<input placeholder="Password" type="password" id="password" class="${properties.kcInputClass!}"
							   name="password"
							   autocomplete="new-password"
							   aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
						/>

                        <#if messagesPerField.existsError('password')>
							<span id="input-error-password" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('password'))?no_esc}
                            </span>
                        </#if>
					</div>
				</div>

				<div class="${properties.kcFormGroupClass!}">

					<div class="${properties.kcInputWrapperClass!}">
						<input placeholder="Confirm password" type="password" id="password-confirm" class="${properties
                        .kcInputClass!}"
							   name="password-confirm"
							   aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
						/>

                        <#if messagesPerField.existsError('password-confirm')>
							<span id="input-error-password-confirm" class="${properties.kcInputErrorMessageClass!}"
								  aria-live="polite">
                                ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                            </span>
                        </#if>
					</div>
				</div>
            </#if>

            <#if recaptchaRequired??>
				<div class="form-group">
					<div class="${properties.kcInputWrapperClass!}">
						<div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
					</div>
				</div>
            </#if>

			<div class="${properties.kcFormGroupClass!}">
				<div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
					<div class="${properties.kcFormOptionsWrapperClass!}">
						<span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
					</div>
				</div>

				<div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
					<input id="kc-register"
						   class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
						   type="submit" value="${msg("doRegister")}"/>
				</div>
			</div>
		</form>
    </#if>
</@layout.registrationLayout>
