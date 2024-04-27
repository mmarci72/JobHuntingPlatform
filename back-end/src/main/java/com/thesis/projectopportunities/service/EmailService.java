package com.thesis.projectopportunities.service;

import com.thesis.projectopportunities.exception.EmailNotSentException;
import com.thesis.projectopportunities.model.Position;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.List;

@Service
@Slf4j
public class EmailService {

	@Value("${frontend.url}")
	private String frontEndUrl;

	private final JavaMailSender javaMailSender;

	private final TemplateEngine htmlTemplateEngine;

	public EmailService(JavaMailSender javaMailSender, @Qualifier("emailTemplateEngine") TemplateEngine htmlTemplateEngine) {
		this.htmlTemplateEngine = htmlTemplateEngine;
		this.javaMailSender = javaMailSender;
	}

	private void setUpEmail(String htmlTemplate, Context ctx, String subject,
							final UserRepresentation user) {

		String fullName = user.getFirstName() + " " + user.getLastName();

		String recipient = user.getEmail();

		ctx.setVariable("fullName", fullName);
		ctx.setVariable("frontEndURL", frontEndUrl);

		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper messageHelper = new MimeMessageHelper(message, "UTF-8");

		try {
			String sender = "noreply@jobPortal.com";
			messageHelper.setFrom(sender);

			final String htmlContent = this.htmlTemplateEngine.process(htmlTemplate, ctx);
			messageHelper.setText(htmlContent, true);
			messageHelper.setSubject(subject);
			messageHelper.setTo(recipient);
			javaMailSender.send(message);
		} catch (MessagingException | MailException e) {
			throw new EmailNotSentException("Email could not be sent to " + recipient, e);
		}
	}

	public void sendNewSummaryJobsEmail(final String subject, List<Position> positions,
										final UserRepresentation user) throws EmailNotSentException {
		final Context ctx = new Context();

		ctx.setVariable("newPositionsCount", positions.size());
		ctx.setVariable("positions", positions);

		setUpEmail("html/email-summary-notification-template", ctx, subject, user);

	}
}
