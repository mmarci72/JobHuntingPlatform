<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','username','password','password-confirm'); section>
    <#if section = "header">
		<#--TODO: Replace removed image-->
		<img class="logo-img" alt="logo" src="${url.resourcesPath}/img/logo.svg">
        ${msg("registerTitle")}
    <#elseif section = "form">
		<form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">

			<div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcInputWrapperClass!}">
                    <input placeholder="First name" type="text" id="firstName" class="${properties.kcInputClass!}" name="firstName"
                           value="${(register.formData.firstName!'')}"
                           aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>"
                    />

                    <#if messagesPerField.existsError('firstName')>
                        <span id="input-error-firstname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('firstName'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcInputWrapperClass!}">
                    <input placeholder="Last name" type="text" id="lastName" class="${properties.kcInputClass!}" name="lastName"
                           value="${(register.formData.lastName!'')}"
                           aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>"
                    />

                    <#if messagesPerField.existsError('lastName')>
                        <span id="input-error-lastname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('lastName'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>

            <#if !realm.registrationEmailAsUsername>
				<div class="${properties.kcFormGroupClass!}">
					<div class="${properties.kcInputWrapperClass!}">
						<input placeholder="Username" type="text" id="username" class="${properties.kcInputClass!}"
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

			<div class="${properties.kcFormGroupClass!} ${messagesPerField.printIfExists('phone',properties.kcFormGroupErrorClass!)}">
				<div class="${properties.kcInputWrapperClass!}">
					<input
						placeholder="Phone number"
						type="text"
						id="phone"
						class="${properties.kcInputClass!}"
						name="user.attributes.phone"
						value="${(register.formData['user.attributes.phone']!'')}"
					/>

					<#if messagesPerField.existsError('phone')>
						<span id="input-error-phone" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('phone'))?no_esc}
                        </span>
					</#if>
				</div>
			</div>

            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcInputWrapperClass!}">
                    <input placeholder="Email" type="text" id="email" class="${properties.kcInputClass!}" name="email"
                           value="${(register.formData.email!'')}" autocomplete="email"
                           aria-invalid="<#if messagesPerField.existsError('email')>true</#if>"
                    />

                    <#if messagesPerField.existsError('email')>
                        <span id="input-error-email" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                            ${kcSanitize(messagesPerField.get('email'))?no_esc}
                        </span>
                    </#if>
                </div>
            </div>


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
