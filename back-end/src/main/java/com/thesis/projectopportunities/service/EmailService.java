package com.thesis.projectopportunities.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.Date;

import com.thesis.projectopportunities.exception.EmailNotSentException;
import com.thesis.projectopportunities.model.ProjectPosition;
import com.thesis.projectopportunities.model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@Slf4j
public class EmailService {

	private final JavaMailSender javaMailSender;

	private final TemplateEngine htmlTemplateEngine;

	public EmailService(JavaMailSender javaMailSender, @Qualifier("emailTemplateEngine") TemplateEngine htmlTemplateEngine) {
		this.htmlTemplateEngine = htmlTemplateEngine;
		this.javaMailSender = javaMailSender;
	}

	private void setUpEmail(String htmlTemplate, Context ctx, String subject, User interestedParty) {
		ctx.setVariable("fullName", interestedParty.getFullName());


		//TODO: Might want to replace this with an image
		/*ClassLoader classLoader = getClass().getClassLoader();
		try (InputStream inputStream = classLoader.getResourceAsStream("")) {
			if (inputStream != null) {
				byte[] fileContent = inputStream.readAllBytes();
				String fileContentBase64 = "data:image/svg+xml;base64," + Base64.getEncoder().encodeToString(fileContent);
				ctx.setVariable("image", fileContentBase64);
			}
		}
		catch (IOException e) {
			LOGGER.error(e.getMessage());
		}*/
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper messageHelper = new MimeMessageHelper(message, "UTF-8");

		try {
			messageHelper.setFrom("noreply@projectopportunities.com");

			final String htmlContent = this.htmlTemplateEngine.process(htmlTemplate, ctx);
			messageHelper.setText(htmlContent, true);
			messageHelper.setSubject(subject);
			messageHelper.setTo(interestedParty.getEmail());
			javaMailSender.send(message);
		}
		catch (MessagingException | MailException e) {
			throw new EmailNotSentException("Email could not be sent to " + interestedParty.getEmail(), e);
		}
	}

	public void sendNewSummaryPositionEmail(final String subject,
		final int numberOfNewPositions, final User interestedParty) throws EmailNotSentException {
		final Context ctx = new Context();

		ctx.setVariable("newPositionsCount", numberOfNewPositions);

		setUpEmail("html/email-summary-notification-template", ctx, subject, interestedParty);

	}

	public void sendNewDetailedPositionEmail(final String subject,
		final ProjectPosition position, final User interestedParty) throws EmailNotSentException {
		final Context ctx = new Context();

		ctx.setVariable("position", position);

		setUpEmail("html/email-detailed-notification-template", ctx, subject, interestedParty);
	}

	public void sendSignUpEmail(final String subject, final User toUser,
		final ProjectPosition position, final User interestedParty) throws EmailNotSentException {
		final Context ctx = new Context();

		ctx.setVariable("name", toUser.getFullName());
		ctx.setVariable("signUpDate", new Date());
		ctx.setVariable("projectName", position.getProject().getName());
		ctx.setVariable("positionSeniority", position.getSeniorityName().toLowerCase());
		ctx.setVariable("positionRoleName", position.getRoleName().toLowerCase().replace("_", " "));
		ctx.setVariable("username", interestedParty.getUsername());
		ctx.setVariable("userEmail", interestedParty.getEmail());
		setUpEmail("html/email-signup-template", ctx, subject, toUser);
	}
}
