//package com.codestates.julsinsa.member;
//
//import com.codestates.julsinsa.auth.utills.JwtUtils;
//import com.codestates.julsinsa.cart.entity.Cart;
//import com.codestates.julsinsa.config.SecurityConfiguration;
//import com.codestates.julsinsa.member.controller.MemberController;
//import com.codestates.julsinsa.member.dto.MemberDto;
//import com.codestates.julsinsa.member.entity.Member;
//import com.codestates.julsinsa.member.mapper.MemberMapper;
//import com.codestates.julsinsa.member.service.MemberService;
//import com.google.gson.Gson;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.FilterType;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import java.time.LocalDate;
//
//import static org.hamcrest.Matchers.is;
//import static org.hamcrest.Matchers.startsWith;
//import static org.mockito.BDDMockito.given;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(
//        controllers = {MemberController.class},
//        excludeAutoConfiguration = SecurityAutoConfiguration.class,
//        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfiguration.class)}
//)
//@MockBean(JpaMetamodelMappingContext.class)
//public class MemberControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private MemberService memberService;
//
//    @MockBean
//    private MemberMapper memberMapper;
//
//    @MockBean
//    private JwtUtils jwtUtils;
//
//    @Test
//    public void signUpMemberTest() throws Exception{
//
//        MemberDto.Post post = new MemberDto.Post("최진영","지녕","qwer@naver.com","qwer","010-1111-1111",
//                LocalDate.of(1990, 1, 1),"123456");
//
//        Gson gson = new Gson();
//        String content = gson.toJson(post);
//
//        given(memberMapper.memberPostToMember(Mockito.any(MemberDto.Post.class))).willReturn(new Member());
//
//        Member mockResultMember = new Member();
//        mockResultMember.setMemberId(1L);
//        mockResultMember.setCart(new Cart());
//
//        given(memberService.createMember(Mockito.any(Member.class))).willReturn(mockResultMember);
//
//        ResultActions actions = mockMvc.perform(
//                post("/members")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content));
//
//        actions
//                .andExpect(status().isCreated());
//
//
//    }
//}
