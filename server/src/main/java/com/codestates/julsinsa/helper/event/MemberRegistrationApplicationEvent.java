package com.codestates.julsinsa.helper.event;

import com.codestates.julsinsa.member.entity.Member;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class MemberRegistrationApplicationEvent extends ApplicationEvent {

    private Member member;
    public MemberRegistrationApplicationEvent(Object source, Member member) {
        // 초기화된 source는 이후 이벤트 핸들러에서 이벤트를 발생시킨 객체를 식별하는데 사용
        super(source);
        this.member = member;
    }
}
