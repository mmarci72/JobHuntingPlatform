<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "header">
		<#--TODO: replace removed file-->
		<img class="logo-img" alt="logo" src="${url.resourcesPath}/img/">
		<span id="header-project_name">
			${msg("loginAccountTitle")}
		</span>
    <#elseif section = "form">
		<div id="kc-form">
			<div id="kc-form-wrapper">
                <#if realm.password>
					<form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}"
						  method="post">
                        <#if !usernameHidden??>
							<div class="${properties.kcFormGroupClass!}">
								<input tabindex="1" id="username" class="${properties.kcInputClass!}" name="username"
									   placeholder="User-ID" value="${(login.username!'')}" type="text" autofocus
									   autocomplete="off"
									   aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
								/>

                                <#if messagesPerField.existsError('username','password')>
									<span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                            </span>
                                </#if>

							</div>
                        </#if>

						<div class="${properties.kcFormGroupClass!}">
							<input placeholder="Password" tabindex="2" id="password" class="${properties.kcInputClass!}"
								   name="password"
								   type="password"
								   autocomplete="off"
								   aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
							/>

                            <#if usernameHidden?? && messagesPerField.existsError('username','password')>
								<span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                        </span>
                            </#if>

						</div>

						<div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
							<input type="hidden" id="id-hidden-input" name="credentialId"
                                   <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
							<input tabindex="4"
								   class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}"
								   name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
						</div>
					</form>
                </#if>
			</div>

		</div>
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
			<div id="kc-registration-container">
				<div id="kc-registration">
					<span>${msg("noAccount")} <a tabindex="6" href="${url.registrationUrl}">${msg("doRegister")}</a></span>
				</div>
			</div>
        </#if>
    <#elseif section = "socialProviders" >
        <#if realm.password && social.providers??>
			<div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
				<hr/>
				<h4>${msg("identity-provider-login-label")}</h4>

				<ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountListGridClass!}</#if>">
                    <#list social.providers as p>
						<a id="social-${p.alias}"
						   class="${properties.kcFormSocialAccountListButtonClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountGridItem!}</#if>"
						   type="button" href="${p.loginUrl}">
                            <#if p.iconClasses?has_content>
								<i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
								<span
									class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">${p.displayName!}</span>
                            <#else>
								<span class="${properties.kcFormSocialAccountNameClass!}">${p.displayName!}</span>
                            </#if>
						</a>
                    </#list>
				</ul>
			</div>
        </#if>
    </#if>

</@layout.registrationLayout>
